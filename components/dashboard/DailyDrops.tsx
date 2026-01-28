"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types";

// Now accepts products as PROPS, instead of fetching internally
export function DailyDrops({ products }: { products: Product[] }) {
    const { dict } = useLanguage();

    // Filter locally from the passed data
    const drops = products.slice(0, 3).map((p) => ({
        title: p.title || "Product", // Fallback text
        id: p.id,
        match: p.metrics?.saturationScore < 40 ? "🔥 Hot" : "95%",
        region: p.culturalFit?.[0]?.countryCode || "Global"
    }));

    return (
        <Card className="border-primary/50 bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        {dict.product.daily.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-full border">
                        <Clock className="h-3 w-3" />
                        {dict.product.daily.refresh} 08:42:12
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">{dict.product.daily.subtitle}</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {drops.map((drop, i) => (
                        <Link href={`/product/${drop.id}`} key={i} className="group flex items-center justify-between p-3 bg-background/60 hover:bg-primary/10 rounded-lg border transition-all cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                <div>
                                    <p className="font-bold text-sm truncate max-w-[120px]">{drop.title}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{drop.region}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-green-500 font-bold text-sm whitespace-nowrap">{drop.match}</span>
                                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
