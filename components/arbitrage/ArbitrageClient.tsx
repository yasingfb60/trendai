"use client";

import { WorldMap } from "@/components/dashboard/WorldMap";
import { ArbitrageTable } from "@/components/arbitrage/ArbitrageTable";
import { Product } from "@/types";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useMemo } from "react";

interface ArbitrageClientProps {
    rawProducts: any[];
}

export function ArbitrageClient({ rawProducts }: ArbitrageClientProps) {
    const { dict, lang } = useLanguage();

    const products: Product[] = useMemo(() => rawProducts.map((p: any) => ({
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
            reasoning: c.reasoning_en, // Using EN for now as fallback or mapped above
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
    })), [rawProducts, lang]);

    return (
        <div className="h-[calc(100vh-4rem)] w-full bg-black relative flex flex-col">
            {/* Header Overlay */}
            <div className="absolute top-6 left-6 z-10 space-y-2 pointer-events-none">
                <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-lg uppercase">
                    {dict.arbitrage?.title || "Global Arbitrage"}
                </h1>
                <p className="text-sm text-muted-foreground w-full max-w-md">
                    {dict.arbitrage?.subtitle || "Live production saturation and demand heatmap."}
                </p>
                <div className="flex gap-4 pt-2">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        <span className="text-xs text-blue-400">High Demand</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                        <span className="text-xs text-orange-400">Viral Alert</span>
                    </div>
                </div>
            </div>

            {/* 1. Top Section: 3D Globe (50% Height) */}
            <div className="h-[50%] w-full border-b border-slate-800 bg-[#1e293b]">
                <WorldMap region="global" products={products} />
            </div>

            {/* 2. Bottom Section: Arbitrage Table (50% Height) */}
            <div className="h-[50%] w-full bg-black/80 backdrop-blur-sm p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        📡 Live Opportunities
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs">{products.length} Found</span>
                    </h2>
                </div>
                <ArbitrageTable products={products} />
            </div>
        </div>
    );
}
