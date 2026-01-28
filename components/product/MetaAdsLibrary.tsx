"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Image as ImageIcon, Calendar, Eye, Copy, ExternalLink, Filter, Download, Facebook, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

// Mock Data simulating BrandSearch.co response
const getMockAds = (productTitle: string) => [
    {
        id: "1",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        status: "active",
        daysActive: 45,
        startDate: "2023-12-01",
        platform: ["fb", "insta"],
        format: "Reels",
        copy: `Don't miss out on the viral sensation! ${productTitle} is 50% OFF for the next 24h only. 🚀`,
        cta: "Shop Now"
    },
    {
        id: "2",
        type: "image",
        thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
        status: "active",
        daysActive: 12,
        startDate: "2024-01-15",
        platform: ["fb"],
        format: "Feed",
        copy: `The perfect solution: ${productTitle}. Get yours today with Free Shipping! 📦`,
        cta: "Learn More"
    },
    {
        id: "3",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        status: "inactive",
        daysActive: 80,
        startDate: "2023-10-01",
        platform: ["insta"],
        format: "Story",
        copy: `Limited Stock Alert! 🚨 Grab the ultimate ${productTitle} before it's gone.`,
        cta: "Shop Now"
    },
    {
        id: "4",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        status: "active",
        daysActive: 5,
        startDate: "2024-01-22",
        platform: ["fb", "insta", "an"],
        format: "Reels",
        copy: `New Year, New Gear! Upgrade your setup with our latest ${productTitle}.`,
        cta: "Shop Now"
    }
];

// Mock Stores Data
const MOCK_STORES = [
    { name: "GadgetWorld US", country: "🇺🇸", price: "$29.99", traffic: "50k/mo", url: "https://gadgetworld-us-demo.com" },
    { name: "Nordic Trends", country: "🇸🇪", price: "€34.95", traffic: "12k/mo", url: "https://nordic-trends-shop.com" },
    { name: "Tokyo Life", country: "🇯🇵", price: "¥4,500", traffic: "85k/mo", url: "https://tokyo-life-japan.jp" },
    { name: "Dubai Drop", country: "🇦🇪", price: "AED 120", traffic: "High", url: "https://dubai-drop-official.ae" },
];

export function MetaAdsLibrary({ title }: { title: string }) {
    const { dict } = useLanguage();
    const mockAds = getMockAds(title);

    return (
        <div className="space-y-8">
            {/* 0. COMPETITOR STORES (Requested Feature) */}
            <Card className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border-indigo-500/30">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-indigo-400" />
                        {dict.product.competitor?.title || "Global Competitors"}
                    </CardTitle>
                    <CardDescription className="text-xs">
                        {dict.product.competitor?.desc || "Stores selling this product worldwide"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {MOCK_STORES.map((store, i) => (
                            <a
                                key={i}
                                href={store.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all cursor-pointer group"
                            >
                                <div>
                                    <p className="font-bold text-sm text-foreground group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                                        {store.name} <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </p>
                                    <p className="text-xs text-muted-foreground">{store.country} • {store.traffic}</p>
                                </div>
                                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                                    {store.price}
                                </Badge>
                            </a>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* 1. HEADER STATISTICS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Active Ads */}
                <Card className="bg-blue-500/10 border-blue-500/20">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1 h-full">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">{dict.product.competitor?.metaAds?.activeAds || "Şu An Yayında"}</p>
                        </div>
                        <p className="text-3xl font-black text-blue-400">12</p>
                        <p className="text-[10px] text-muted-foreground">{dict.product.competitor?.metaAds?.activeDesc || "Şu an aktif olan"}</p>
                    </CardContent>
                </Card>

                {/* Total History */}
                <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1 h-full">
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar className="h-3 w-3 text-purple-500" />
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{dict.product.competitor?.metaAds?.totalHistory || "Toplam Geçmiş"}</p>
                        </div>
                        <p className="text-3xl font-black text-foreground">148</p>
                        <p className="text-[10px] text-muted-foreground">{dict.product.competitor?.metaAds?.historyDesc || "Tüm zamanlar"}</p>
                    </CardContent>
                </Card>

                {/* Video Preference */}
                <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1 h-full">
                        <div className="flex items-center gap-2 mb-1">
                            <Play className="h-3 w-3 text-green-500" />
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{dict.product.competitor?.metaAds?.videoContent || "Format Tercihi"}</p>
                        </div>
                        <div className="flex items-end gap-1">
                            <p className="text-3xl font-black text-green-500">85%</p>
                            <span className="text-sm font-bold text-foreground/50 mb-1">{dict.product.competitor?.metaAds?.video || "Video"}</span>
                        </div>
                        {/* Mini Progress Bar */}
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-1 overflow-hidden flex">
                            <div className="h-full bg-green-500" style={{ width: "85%" }} />
                            <div className="h-full bg-zinc-700" style={{ width: "15%" }} />
                        </div>
                        <div className="flex justify-between w-full text-[9px] text-muted-foreground px-1 mt-0.5">
                            <span>{dict.product.competitor?.metaAds?.video || "Video"}</span>
                            <span>{dict.product.competitor?.metaAds?.image || "Görsel"}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Impressions */}
                <Card className="bg-card/50 border-border/50">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1 h-full">
                        <div className="flex items-center gap-2 mb-1">
                            <Eye className="h-3 w-3 text-orange-500" />
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{dict.product.competitor?.metaAds?.impressions || "Tahmini Görüntülenme"}</p>
                        </div>
                        <p className="text-3xl font-black text-foreground">2.4M</p>
                        <p className="text-[10px] text-muted-foreground">{dict.product.competitor?.metaAds?.reachDesc || "Son 30 gün tahmini"}</p>
                    </CardContent>
                </Card>
            </div>

            {/* 2. FILTERS & SEARCH */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/50 p-4 rounded-xl border border-border/50">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Facebook className="h-5 w-5 text-blue-500" />
                        {dict.product.competitor?.metaAds?.libraryTitle}
                    </h3>
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-400">{dict.product.competitor?.metaAds?.live}</Badge>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" /> {dict.product.competitor?.metaAds?.filter}
                    </Button>
                    <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
                        {dict.product.competitor?.metaAds?.viewMeta} <ExternalLink className="h-3 w-3" />
                    </Button>
                </div>
            </div>

            {/* 3. CREATIVES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockAds.map((ad) => (
                    <div key={ad.id} className="group bg-card border border-border/50 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all flex flex-col">
                        {/* Header */}
                        <div className="p-3 bg-muted/30 border-b border-border/50 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <Badge variant={ad.status === 'active' ? 'default' : 'secondary'} className={ad.status === 'active' ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' : ''}>
                                    {ad.status === 'active' ? '● ' + dict.product.competitor?.metaAds?.live : '● Inactive'}
                                </Badge>
                                <span className="text-muted-foreground">{ad.daysActive} {dict.product.competitor?.metaAds?.days}</span>
                            </div>
                            <span className="text-muted-foreground">{ad.startDate}</span>
                        </div>

                        {/* Media Preview */}
                        <div className="relative aspect-[9/16] bg-zinc-900 group-hover:opacity-90 transition-opacity cursor-pointer">
                            <img src={ad.thumbnail} alt="Ad Creative" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all gap-2">
                                <Button size="sm" variant="secondary" className="gap-2">
                                    {ad.type === 'video' ? <Play className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
                                    {dict.product.competitor?.metaAds?.preview}
                                </Button>
                                <Button size="sm" variant="outline" className="gap-2 bg-black/50 border-white/20 text-white hover:bg-black/70">
                                    <Download className="h-4 w-4" /> {dict.product.competitor?.metaAds?.download}
                                </Button>
                            </div>
                            {/* Type Badge */}
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded">
                                {ad.format}
                            </div>
                        </div>

                        {/* Footer (Copy & CTA) */}
                        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-card">
                            <div className="space-y-2">
                                <p className="text-xs text-muted-foreground line-clamp-3 italic">
                                    "{ad.copy}"
                                </p>
                            </div>
                            <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                                <Button variant="ghost" size="sm" className="h-6 text-xs text-muted-foreground hover:text-foreground">
                                    <Copy className="h-3 w-3 mr-1" /> {dict.product.competitor?.metaAds?.copyText}
                                </Button>
                                <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-400">
                                    {ad.cta}
                                </Badge>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
