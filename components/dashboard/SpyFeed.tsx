"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, ShoppingBag, Eye, TrendingUp, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider"; // Assuming you might want i18n later, or just hardcode for now
import { formatDistanceToNow } from "date-fns";
import { tr, enUS } from "date-fns/locale";

interface CompetitorProduct {
    id: string;
    store_name: string;
    title: string;
    price: number;
    image_url: string;
    published_at: string;
    detected_at: string;
    store_url: string;
    handle: string;
}

import { useState, useEffect } from "react";

import { execPythonScraper } from "@/lib/bot";
import { Loader2, Satellite } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SpyFeed({ products }: { products: CompetitorProduct[] }) {
    // Determine locale based on context (simplified for now)
    const locale = tr;
    const [mounted, setMounted] = useState(false);
    const [scanning, setScanning] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    async function handleScan() {
        setScanning(true);
        try {
            await execPythonScraper();
            // No need to refresh, polling handle updates
        } catch (e) {
            console.error(e);
        } finally {
            setScanning(false);
        }
    }

    if (!products || products.length === 0) {
        return (
            <Card className="h-full border-orange-500/20 bg-orange-500/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Eye className="h-5 w-5 text-orange-500" />
                        Casus Akışı (Spy Feed)
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm py-8 space-y-4">
                    <p>Henüz rakip aktivitesi tespit edilmedi.</p>
                    <Button onClick={handleScan} disabled={scanning} className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg w-full">
                        {scanning ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Satellite className="h-4 w-4 mr-2" />}
                        {scanning ? "Uydu Tarıyor..." : "Uyduyu Başlat (Taramayı Tetikle)"}
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-orange-500/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold flex items-center gap-1 z-10">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                CANLI İZLEME
            </div>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Eye className="h-5 w-5 text-orange-500" />
                        Casus Akışı (Canlı)
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">Rakiplerin vitrinine düşen son ürünler</p>
                </div>
                <Button onClick={handleScan} disabled={scanning} size="sm" className="bg-orange-600 hover:bg-orange-700 text-white shadow-md transition-all hover:scale-105 active:scale-95 ml-auto">
                    {scanning ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Satellite className="h-4 w-4 mr-2" />}
                    {scanning ? "Uydu Tarıyor..." : "Uyduyu Başlat"}
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-y-auto custom-scrollbar pr-1" style={{ height: '300px' }}>
                    <div className="divide-y divide-border/50">
                        {products.map((p) => (
                            <a
                                key={p.id}
                                href={p.handle ? `${p.store_url}/products/${p.handle}` : p.store_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-3 hover:bg-orange-500/5 transition-all group"
                            >
                                <div className="flex gap-3 items-center">
                                    {/* Image (Compact) */}
                                    <div className="h-12 w-12 bg-muted rounded-md overflow-hidden shrink-0 border relative shadow-sm">
                                        {p.image_url ? (
                                            <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gray-100">
                                                <ShoppingBag className="h-4 w-4 opacity-20" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 pr-2">
                                        <div className="flex items-center justify-between gap-2 mb-0.5">
                                            <h4 className="text-xs font-semibold leading-tight truncate group-hover:text-orange-600 transition-colors max-w-[140px]">
                                                {p.title}
                                            </h4>
                                            <span className="text-[10px] text-muted-foreground whitespace-nowrap opacity-70">
                                                {mounted ? formatDistanceToNow(new Date(p.detected_at), { addSuffix: true, locale }) : ''}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-orange-200 text-orange-700 bg-orange-50/50">
                                                    {p.store_name}
                                                </Badge>
                                                <span className="font-bold text-xs text-primary">${p.price}</span>
                                            </div>
                                            <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
