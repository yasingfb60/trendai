import { supabaseAdmin } from "@/lib/supabase-admin";

export interface ViralTrend {
    title: string;
    handle: string;
    image_url: string;
    store_count: number;
    avg_price: number;
    first_detected: string;
    product_ids: string[];
}

export async function analyzeViralTrends(): Promise<ViralTrend[]> {
    // 1. Fetch recent competitor products (last 24-48 hours ideally, but for demo all)
    const { data: products, error } = await supabaseAdmin
        .from('competitor_products')
        .select('id, title, handle, image_url, store_id, price, detected_at')
        .order('detected_at', { ascending: false })
        .limit(100);

    if (error || !products) {
        console.error("Trend Analysis Error:", error);
        return [];
    }

    // 2. Group by normalized title to find duplicates across DIFFERENT stores
    const productGroups: Record<string, { stores: Set<string>, prices: number[], first_detected: string, ids: string[], handle: string, image: string }> = {};

    for (const p of products) {
        // Simple normalization: lowercase and remove special chars
        const key = p.title.toLowerCase().trim();

        if (!productGroups[key]) {
            productGroups[key] = {
                stores: new Set(),
                prices: [],
                first_detected: p.detected_at,
                ids: [],
                handle: p.handle,
                image: p.image_url
            };
        }

        productGroups[key].stores.add(p.store_id);
        productGroups[key].prices.push(Number(p.price));
        productGroups[key].ids.push(p.id);

        // Keep the earliest detection time
        if (new Date(p.detected_at) < new Date(productGroups[key].first_detected)) {
            productGroups[key].first_detected = p.detected_at;
        }
    }

    // 3. Filter for "Viral" (Appears in 2+ distinct stores)
    // For demo purposes, >1 is enough to show the concept. In prod, maybe >3.
    const viralTrends: ViralTrend[] = [];

    for (const [title, data] of Object.entries(productGroups)) {
        if (data.stores.size >= 2) {
            const avg_price = data.prices.reduce((a, b) => a + b, 0) / data.prices.length;
            viralTrends.push({
                title: title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), // Capitalize
                handle: data.handle,
                image_url: data.image,
                store_count: data.stores.size,
                avg_price: Number(avg_price.toFixed(2)),
                first_detected: data.first_detected,
                product_ids: data.ids
            });
        }
    }

    // Sort by store count descending (most viral first)
    return viralTrends.sort((a, b) => b.store_count - a.store_count);
}
