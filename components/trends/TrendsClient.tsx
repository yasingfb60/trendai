"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { Zap, TrendingUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Product } from "@/types";

export function TrendsClient({ rawProducts }: { rawProducts: any[] }) {
    const { dict, lang } = useLanguage();

    // MAP RAW DATA TO TYPED PRODUCT (Same logic as DashboardClient to ensure consistency)
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
    })), [rawProducts, lang]);

    // Simulate "Viral Algorithm": For now, products with saturation < 50 OR high ROAS
    const viralProducts = products.filter(p =>
        p.metrics.saturationScore < 50 || p.metrics.roas > 4.0
    );

    return (
        <div className="p-6 space-y-8 h-full overflow-y-auto bg-black/50">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        <Zap className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                        {dict.trends?.title || "VIRAL ALARM_"}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {dict.trends?.subtitle || "AI-detected rising stars before they hit global saturation."}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2 border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/10">
                        <Filter className="h-4 w-4" />
                        {dict.trends?.filterBtn || "Filter High Opportunity"}
                    </Button>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">{dict.trends?.todaySignal || "Today's Signals"}</p>
                        <p className="text-2xl font-bold text-yellow-500">{viralProducts.length} {dict.trends?.products || "Products"}</p>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {viralProducts.map((product) => (
                    <div key={product.id} className="relative group">
                        {/* Viral Badge Overlay */}
                        <Badge className="absolute top-3 left-3 z-10 bg-yellow-500 text-black font-bold animate-pulse">
                            🔥 {product.culturalFit[0]?.matchScore || 95}{dict.trends?.match || "% MATCH"}
                        </Badge>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
