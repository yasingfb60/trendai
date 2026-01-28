
import { getProducts, getInfluencers } from "@/lib/api";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import { Product } from "@/types";
import { generateSuppliers } from "@/lib/supplierEngine";
import { generateInfluencers } from "@/lib/influencerEngine";

// Force Dynamic Rendering since we rely on live DB data
export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    let product: Product | null = null;

    // 1. Try Fetching from DB (Server Side)
    try {
        const allProducts = await getProducts('en'); // Default to EN for fetch, client handles lang display

        const found = allProducts.find(p =>
            (p.handle && p.handle === handle) ||
            String(p.id) === handle ||
            (p.slug && p.slug === handle) // Match slug too
        );

        if (found) {
            // Fetch real influencers
            const nicheMap: Record<string, string> = {
                'Electronics': 'Tech',
                'Fashion': 'Fashion',
                'Beauty': 'Beauty',
                'Home': 'Home',
                'Home Decor': 'Home',
                'Fitness': 'Fitness',
                'Gaming': 'Gaming'
            };
            const niche = nicheMap[found.category] || 'Tech';
            const realInfluencers = await getInfluencers(niche);

            const mappedInfluencers = realInfluencers.map((inf: any) => ({
                id: inf.id,
                name: inf.handle,
                handle: inf.handle,
                matchScore: Math.floor(Math.random() * 10) + 85,
                platform: inf.platform,
                followers: inf.followers,
                engagementRate: inf.engagement_rate,
                niche: inf.niche,
                estimatedCost: inf.estimated_cost,
                estimatedViews: inf.avg_views
            }));

            product = { ...found, influencers: mappedInfluencers.slice(0, 3) };
        }
    } catch (e) {
        console.error("Product Load Error:", e);
    }

    // 2. Fallback to Mock Data if not found (For Demo Purposes)
    if (!product) {
        // Simple mock generator for demo fallback
        const mock: Product = {
            id: handle,
            title: "Demo Product (DB Unavailable)",
            description: "This is a placeholder because the live product could not be found.",
            price: 99.99,
            category: "Demo",
            currency: "USD",
            imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
            metrics: {
                dailySales: 100, monthlyRevenue: 5000, grossMargin: 50, roas: 3,
                activeAds: 5, saturationScore: 20, adCountries: ['US'], salesHistory: []
            },
            culturalFit: [],
            suppliers: generateSuppliers("Electronics", 99),
            influencers: generateInfluencers("Electronics", 99)
        };
        product = mock;
    }

    if (!product) {
        return notFound();
    }

    return <ProductDetailClient product={product} />;
}
