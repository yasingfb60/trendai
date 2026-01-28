"use client";

// React Hooks for Realtime Updates
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Activity, DollarSign, TrendingUp, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { DailyDrops } from "@/components/dashboard/DailyDrops";
import { RegionFilter } from "@/components/dashboard/RegionFilter";
import { BotTrigger } from "@/components/dashboard/BotTrigger";
import { SpyFeed } from "@/components/dashboard/SpyFeed";
import { Product } from "@/types";

import { WorldMap } from "@/components/dashboard/WorldMap";
import { TrendAlertSystem } from "@/components/dashboard/TrendAlertSystem";
import { fetchSpyFeed } from "@/app/actions";

export default function DashboardClient({ rawProducts, competitorProducts }: { rawProducts: any[], competitorProducts: any[] }) {
    const { dict, lang } = useLanguage();
    const searchParams = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';
    const region = searchParams.get('region') || 'ALL';

    // State for Realtime Updates
    const [liveCompetitorProducts, setLiveCompetitorProducts] = useState(competitorProducts || []);

    // REALTIME POLLING (Bypasses RLS via Server Action)
    useEffect(() => {
        // Initial fetch
        const loadSpyFeed = async () => {
            try {
                const newFeed = await fetchSpyFeed();
                if (newFeed) setLiveCompetitorProducts(newFeed);
            } catch (error) {
                console.error("Failed to fetch spy feed:", error);
            }
        };

        loadSpyFeed(); // Load immediately on mount

        // Set up polling
        const interval = setInterval(async () => {
            try {
                const newFeed = await fetchSpyFeed();
                if (newFeed) setLiveCompetitorProducts(newFeed);
            } catch (error) {
                console.error("Polling Error:", error);
            }
        }, 10000); // Poll every 10 seconds (optimized)

        return () => clearInterval(interval);
    }, []);

    // Map RAW data to Typed Product (Client Side Mapping)
    const products: Product[] = rawProducts.map((p: any) => ({
        id: p.id,
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
            dailySales: 0, monthlyRevenue: 0, grossMargin: 0, roas: 0, activeAds: 0, saturationScore: 0, salesHistory: [], adCountries: []
        },
        culturalFit: p.cultural_insights?.map((c: any) => ({
            countryCode: c.country_code,
            countryName: c.country_code,
            matchScore: c.match_score,
            reasoning: lang === 'tr' ? c.reasoning_tr : c.reasoning_en,
            sellingPoints: [], painPoints: []
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

    // Client Side Filtering
    const filteredProducts = products.filter(p => {
        const titleMatch = p.title?.toLowerCase().includes(query);

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

        return (titleMatch || query === "") && isRegionMatch;
    });

    const stats = [
        {
            title: dict.dashboard.totalRevenue,
            value: "$45,231.89",
            description: `+20.1% ${dict.dashboard.month}`,
            icon: DollarSign,
        },
        {
            title: dict.dashboard.activeProducts,
            value: "+2350",
            description: `+180 ${dict.dashboard.verified}`,
            icon: Activity,
        },
        {
            title: dict.dashboard.trendingNow,
            value: "12",
            description: dict.dashboard.viral,
            icon: TrendingUp,
        },
        {
            title: dict.dashboard.openArbitrage,
            value: "5",
            description: dict.dashboard.gap,
            icon: Users,
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* VIRAL ALERT SYSTEM */}
            <TrendAlertSystem />

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">{dict.dashboard.title}</h1>
                <BotTrigger />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* REGION FILTERS (Client Component) */}
            <RegionFilter />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Daily Notifications Column (Left) */}
                <div className="col-span-full lg:col-span-2 space-y-4">
                    <DailyDrops products={filteredProducts} />

                    {/* Recent Opportunities Moved Here */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{filteredProducts.length > 0 ? dict.dashboard.recentOpp : (dict.common?.noProducts || "No products found")}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {query ? `${dict.common?.searching || "Searching for"} "${query}"` : dict.dashboard.recentOppDesc}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar" style={{ height: '300px' }}>
                                {filteredProducts.map((product) => (
                                    <Link href={`/product/${product.id}`} key={product.id} className="flex items-center gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors cursor-pointer group">
                                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary shrink-0">
                                            {product.title?.charAt(0) || '?'}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{product.title}</p>
                                            <p className="text-xs text-muted-foreground truncate">{product.metrics.saturationScore < 30 ? "🔥 Viral Potential" : "📈 Healthy Growth"}</p>
                                        </div>
                                        <div className="ml-auto font-bold text-green-500 whitespace-nowrap">
                                            {product.culturalFit.length > 0 ? `${product.culturalFit[0].matchScore}% Match` : (dict.common?.new || 'New')}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Heatmap & Spy Feed Column (Right - Main) */}
                <div className="col-span-full lg:col-span-5 space-y-4">
                    {/* MAIN DASHBOARD CONTENT */}
                    {/* 1. 3D WORLD MAP (Top - Full Width) */}
                    <div className="w-full h-[500px] bg-card/30 rounded-xl border border-border/50 overflow-hidden relative shadow-2xl shadow-indigo-500/10">
                        <WorldMap region={region} products={products} />

                        {/* Overlay Title */}
                        <div className="absolute top-4 left-4 z-10 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                            <span className="text-xs font-bold text-indigo-300">{dict.common?.liveMarkets || "LIVE MARKETS"}</span>
                        </div>
                    </div>

                    {/* 2. SPY FEED (Bottom - Full Width) */}
                    <div className="w-full">
                        <SpyFeed products={liveCompetitorProducts} />
                    </div>
                </div>
            </div>
        </div>
    );
}

