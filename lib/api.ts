import { supabase } from './supabase';
import { supabaseAdmin } from './supabase-admin';
import { Product } from '@/types';

// 1. Fetch RAW data (for Client Components that want to do their own mapping)
export async function getRawProducts() {
    // Use ADMIN client to bypass RLS policies and ensure we see all data
    const { data: products, error } = await supabaseAdmin
        .from('products')
        .select(`
            *,
            product_metrics(*),
            cultural_insights(*),
            suppliers(*)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Supabase Error:", JSON.stringify(error, null, 2));
        return [];
    }

    // DEBUG: Log first product relations to see if they are empty
    if (products?.[0]) {
        console.log("DEBUG RELATION DATA:", {
            title: products[0].title_en,
            metrics: products[0].product_metrics,
            insights: products[0].cultural_insights,
            suppliers: products[0].suppliers
        });
    }

    return products || [];
}

export async function getCompetitorProducts() {
    const { data, error } = await supabase
        .from('competitor_products')
        .select(`
            *,
            monitored_stores (
                name,
                url
            )
        `)
        .order('detected_at', { ascending: false })
        .limit(20);

    if (error) {
        console.error("Spy Fetch Error:", error);
        return [];
    }

    return data?.map((p: any) => ({
        id: p.id,
        store_name: p.monitored_stores?.name || "Unknown Store",
        store_url: p.monitored_stores?.url,
        title: p.title,
        price: Number(p.price),
        image_url: p.image_url,
        published_at: p.published_at,
        detected_at: p.detected_at,
        handle: p.handle
    })) || [];
}

// 2. Fetch and Map data (for Server Components like Product Detail Page)
export async function getProducts(lang: 'en' | 'tr' = 'en'): Promise<Product[]> {
    const products = await getRawProducts();

    return products.map((p: any) => ({
        id: p.id,
        handle: p.handle,
        title: lang === 'tr' ? p.title_tr : p.title_en,
        description: lang === 'tr' ? p.description_tr : p.description_en,
        imageUrl: p.image_url,
        price: Number(p.price),
        currency: p.currency,
        category: p.category,
        metrics: p.product_metrics?.[0] ? {
            dailySales: p.product_metrics[0].daily_sales,
            monthlyRevenue: Number(p.product_metrics[0].monthly_revenue),
            grossMargin: Number(p.product_metrics[0].gross_margin),
            roas: Number(p.product_metrics[0].roas),
            activeAds: p.product_metrics[0].active_ads,
            saturationScore: p.product_metrics[0].saturation_score,
            salesHistory: [],
            adCountries: p.product_metrics[0].ad_countries || []
        } : {
            dailySales: 0,
            monthlyRevenue: 0,
            grossMargin: 0,
            roas: 0,
            activeAds: 0,
            saturationScore: 0,
            salesHistory: [],
            adCountries: []
        },
        culturalFit: p.cultural_insights?.map((c: any) => ({
            countryCode: c.country_code,
            countryName: c.country_code,
            matchScore: c.match_score,
            reasoning: lang === 'tr' ? c.reasoning_tr : c.reasoning_en,
            sellingPoints: [],
            painPoints: []
        })) || [],
        suppliers: p.suppliers?.map((s: any) => ({
            id: s.id,
            name: s.name,
            type: s.type,
            location: s.location,
            moq: s.moq,
            pricePerUnit: Number(s.price_per_unit),
            leadTime: s.lead_time,
            verified: s.verified,
            rating: 0
        })) || [],
        influencers: []
    }));
}

// 3. Search Mapper (Legacy support / Server Side Filter)
export async function searchProductsDB(query: string, region: string, lang: 'en' | 'tr') {
    const products = await getProducts(lang);
    const q = query.toLowerCase();

    return products.filter(p => {
        const titleMatch = p.title.toLowerCase().includes(q);

        let isRegionMatch = true;
        if (region === "MENA") {
            isRegionMatch = p.culturalFit.some(c => ["TR", "SA", "AE", "QA", "EG"].includes(c.countryCode));
        } else if (region === "EU") {
            isRegionMatch = p.culturalFit.some(c => ["GB", "DE", "FR", "IT", "ES"].includes(c.countryCode));
        } else if (region === "US") {
            isRegionMatch = p.culturalFit.some(c => ["US", "CA"].includes(c.countryCode));
        } else if (region === "ASIA") {
            isRegionMatch = p.culturalFit.some(c => ["JP", "KR", "CN"].includes(c.countryCode));
        }

        return (titleMatch || q === "") && isRegionMatch;
    });
}

// 4. Fetch Influencers
export async function getInfluencers(niche?: string) {
    let query = supabase.from('influencers').select('*');

    if (niche && niche !== 'All') {
        query = query.eq('niche', niche);
    }

    // Default order by match/quality
    const { data, error } = await query.order('followers', { ascending: false });

    if (error) {
        console.error("Influencer Fetch Error:", JSON.stringify(error, null, 2));
        return [];
    }

    return data || [];
}

// 5. Fetch K-Bridge Opportunities
export async function getKoreanOpportunities() {
    const { data, error } = await supabaseAdmin
        .from('products')
        .select(`
            *,
            product_metrics(*),
            cultural_insights(*),
            suppliers(*)
        `)
        .ilike('slug', 'kr-%') // Filter specifically for Korean scraper output
        .eq('is_active', true)
        .eq('is_active', true)
        .order('price', { ascending: true });

    if (error) {
        console.error("K-Bridge Fetch Error:", error);
        return [];
    }

    return data || [];
}
