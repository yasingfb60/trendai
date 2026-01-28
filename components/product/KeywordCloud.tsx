"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export function KeywordCloud({ title }: { title: string }) {
    const { dict } = useLanguage();

    // Mock generation of keywords based on product title
    const words = title.split(' ').filter(w => w.length > 3);
    const mockKeywords = words.map((w, i) => ({
        text: w,
        volume: Math.floor(Math.random() * 50000) + 1000,
        competition: Math.floor(Math.random() * 100),
        cpc: Number((Math.random() * 2).toFixed(2))
    }));

    // Add some fixed high-value keywords
    mockKeywords.push({ text: "best " + words[0], volume: 85000, competition: 85, cpc: 1.5 });
    mockKeywords.push({ text: "cheap " + words[1], volume: 42000, competition: 40, cpc: 0.8 });

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    {dict.product.keywords.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                    {mockKeywords.map((k, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-muted rounded-full text-xs font-medium border hover:border-primary transition-colors cursor-pointer"
                            style={{ fontSize: Math.max(12, Math.min(20, k.volume / 2000)) + 'px' }}
                        >
                            {k.text}
                        </span>
                    ))}
                </div>

                {/* Mini Table */}
                <div className="space-y-2">
                    <div className="grid grid-cols-4 text-xs font-bold text-muted-foreground px-2">
                        <div className="col-span-2">Keyword</div>
                        <div className="text-right">{dict.product.keywords.volume}</div>
                        <div className="text-right">{dict.product.keywords.cpc}</div>
                    </div>
                    {mockKeywords.slice(0, 4).map((k, i) => (
                        <div key={i} className="grid grid-cols-4 text-sm px-2 py-1 border-b last:border-0">
                            <div className="col-span-2 truncate">{k.text}</div>
                            <div className="text-right">{k.volume.toLocaleString()}</div>
                            <div className="text-right">${k.cpc}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
