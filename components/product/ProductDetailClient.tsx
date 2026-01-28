"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { CulturalFit } from "@/components/product/CulturalFit";
import { InfluencerScout } from "@/components/product/InfluencerScout";
import { ProductMetrics, SalesTrendChart } from "@/components/product/ProductMetrics";
import { SupplierFinder } from "@/components/product/SupplierFinder";
import { ProfitCalculator } from "@/components/product/ProfitCalculator";
import { KeywordCloud } from "@/components/product/KeywordCloud";
import { AILab } from "@/components/product/AILab";
import { VideoGenerator } from "@/components/product/VideoGenerator";
import { CompetitorAnalysis } from "@/components/product/CompetitorAnalysis";
import { AdIntelligence } from "@/components/product/AdIntelligence";
import { MetaAdsLibrary } from "@/components/product/MetaAdsLibrary";
import { ArrowLeft, ExternalLink, Share2, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Product } from "@/types";

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { dict } = useLanguage();
    const [activeTab, setActiveTab] = useState("analysis");

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header / Nav */}
            <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    {dict.product.back}
                </Link>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" /> {dict.product.share}
                    </Button>
                    <Button variant="default" size="sm">
                        <Star className="h-4 w-4 mr-2" /> {dict.product.track}
                    </Button>
                </div>
            </div>

            {/* Main Product Info */}
            <div className="flex flex-col md:flex-row gap-8 items-stretch">
                <div className="w-full md:w-1/3 aspect-square md:aspect-auto bg-muted rounded-xl flex items-center justify-center relative overflow-hidden group">
                    {product.imageUrl && (
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="secondary" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" /> {dict.product.viewAmazon}
                        </Button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded-full">{product.category}</span>
                            <span className="text-muted-foreground text-xs">ID: {product.id}</span>
                        </div>
                        <h1 className="text-3xl font-bold">{product.title}</h1>
                        <p className="text-muted-foreground mt-2">{product.description}</p>
                    </div>

                    <div className="flex gap-8 border-t border-b py-6">
                        <div>
                            <p className="text-sm text-muted-foreground">{dict.product.sellingPrice}</p>
                            <p className="text-2xl font-bold">${product.price}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">{dict.product.sourcingCost}</p>
                            <p className="text-2xl font-bold text-green-500">
                                {product.suppliers?.[0] ? `$${product.suppliers[0].pricePerUnit}` : "N/A"}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">{dict.product.profitUnit}</p>
                            <p className="text-2xl font-bold">
                                {product.suppliers?.[0]
                                    ? `$${(product.price - product.suppliers[0].pricePerUnit).toFixed(2)}`
                                    : "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABS LAYOUT - Full Width */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
                <TabsList className="flex w-full justify-start gap-4 mb-8 bg-transparent p-0 h-auto">
                    <TabsTrigger
                        value="analysis"
                        style={activeTab === 'analysis' ? { backgroundColor: '#06b6d4', color: 'white', borderColor: '#06b6d4', boxShadow: '0 0 15px rgba(6,182,212,0.5)' } : {}}
                        className={`flex-1 max-w-[200px] border shadow-sm h-10 rounded-lg transition-all font-bold ${activeTab !== 'analysis' ? 'bg-background border-muted hover:border-cyan-200' : ''}`}
                    >
                        📊 {dict.product.tabs?.analysis || "Analysis"}
                    </TabsTrigger>
                    <TabsTrigger
                        value="operations"
                        style={activeTab === 'operations' ? { backgroundColor: '#f59e0b', color: 'black', borderColor: '#f59e0b', boxShadow: '0 0 15px rgba(245,158,11,0.5)' } : {}}
                        className={`flex-1 max-w-[200px] border shadow-sm h-10 rounded-lg transition-all font-bold ${activeTab !== 'operations' ? 'bg-background border-muted hover:border-amber-200' : ''}`}
                    >
                        🏭 {dict.product.tabs?.operations || "Operations"}
                    </TabsTrigger>
                    <TabsTrigger
                        value="marketing"
                        style={activeTab === 'marketing' ? { backgroundColor: '#ec4899', color: 'white', borderColor: '#ec4899', boxShadow: '0 0 15px rgba(236,72,153,0.5)' } : {}}
                        className={`flex-1 max-w-[200px] border shadow-sm h-10 rounded-lg transition-all font-bold ${activeTab !== 'marketing' ? 'bg-background border-muted hover:border-pink-200' : ''}`}
                    >
                        🦄 {dict.product.tabs?.marketing || "Marketing"}
                    </TabsTrigger>
                    <TabsTrigger
                        value="meta-ads"
                        style={activeTab === 'meta-ads' ? { backgroundColor: '#3b82f6', color: 'white', borderColor: '#3b82f6', boxShadow: '0 0 15px rgba(59,130,246,0.5)' } : {}}
                        className={`flex-1 max-w-[200px] border shadow-sm h-10 rounded-lg transition-all font-bold ${activeTab !== 'meta-ads' ? 'bg-background border-muted hover:border-blue-200' : ''}`}
                    >
                        ⚡ Meta Ads
                    </TabsTrigger>
                </TabsList>

                {/* TAB 1: ANALYSIS */}
                <TabsContent value="analysis" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <SalesTrendChart metrics={product.metrics} />
                    <div className="grid grid-cols-1 gap-8">
                        <ProductMetrics metrics={product.metrics} />
                        <CompetitorAnalysis price={product.price} title={product.title} />
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                        <CulturalFit reports={product.culturalFit} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <AdIntelligence activeCountries={product.metrics.adCountries || []} />
                        <KeywordCloud title={product.title} />
                    </div>
                </TabsContent>

                {/* TAB 2: OPERATIONS */}
                <TabsContent value="operations" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                        <div className="lg:col-span-3 h-full">
                            <SupplierFinder suppliers={product.suppliers} />
                        </div>
                        <div className="lg:col-span-2 h-full">
                            <ProfitCalculator product={product} />
                        </div>
                    </div>
                </TabsContent>

                {/* TAB 3: MARKETING */}
                <TabsContent value="marketing" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 gap-8 items-start">
                        <VideoGenerator product={product} />
                        <InfluencerScout influencers={product.influencers} />
                    </div>
                    <div className="pt-8 border-t">
                        <AILab product={product} />
                    </div>
                </TabsContent>

                {/* TAB 4: META ADS LIBRARY */}
                <TabsContent value="meta-ads" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <MetaAdsLibrary title={product.title} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
