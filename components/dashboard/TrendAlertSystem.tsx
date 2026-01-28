import Link from "next/link";
import { useState, useEffect } from "react";
import { checkViralTrends } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Siren, TrendingUp, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface ViralTrend {
    title: string;
    handle: string;
    image_url: string;
    store_count: number;
    avg_price: number;
    first_detected: string;
}

export function TrendAlertSystem() {
    const [trends, setTrends] = useState<ViralTrend[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Poll for trends every 10 seconds (Optimized)
        const interval = setInterval(async () => {
            const data = await checkViralTrends();
            setTrends(data);
            setLoading(false);
        }, 10000);

        // Initial fetch
        checkViralTrends().then(data => {
            setTrends(data);
            setLoading(false);
        });

        return () => clearInterval(interval);
    }, []);

    if (loading || trends.length === 0) return null;

    return (
        <Card className="border-red-500/50 bg-red-950/10 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-in slide-in-from-top-2 duration-500">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-red-500 text-lg">
                    <Siren className="h-5 w-5 animate-pulse" />
                    VİRAL ALARMI: Fırsat Tespit Edildi!
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {trends.slice(0, 3).map((trend, i) => (
                    <Link href={`/product/${trend.handle || 'demo'}`} key={i} className="block group">
                        <div className="flex items-center justify-between bg-background/50 p-3 rounded-lg border border-red-500/20 group-hover:bg-red-500/5 transition-all cursor-pointer">
                            <div className="flex items-center gap-3">
                                {trend.image_url && (
                                    <div className="h-10 w-10 rounded bg-muted overflow-hidden">
                                        <img src={trend.image_url} alt="" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="font-bold text-base text-foreground group-hover:text-red-500 transition-colors">
                                        {trend.title} <span className="text-xs text-muted-foreground font-normal ml-2">(Detay İçin Tıkla)</span>
                                    </span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <TrendingUp className="h-3 w-3 text-red-400" />
                                        {trend.store_count} Mağaza Satmaya Başladı
                                        <span className="opacity-50 mx-1">•</span>
                                        Ort. Fiyat: ${trend.avg_price}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-xs font-mono text-red-500 bg-red-500/10 px-2 py-1 rounded">
                                    {formatDistanceToNow(new Date(trend.first_detected), { addSuffix: true, locale: tr })}
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    </Link>
                ))}
            </CardContent>
        </Card>
    );
}
