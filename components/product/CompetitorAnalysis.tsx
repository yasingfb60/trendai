"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, ShoppingCart, Truck, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/button";

// Mock Data for Price History
const generatePriceHistory = (basePrice: number) => {
    const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
    return months.map((month, i) => {
        const variation = Math.random() * 20 - 10;
        // Simulate a drop in Nov (Black Friday)
        const seasonal = month === "Nov" ? -15 : 0;
        return {
            month,
            myPrice: Math.max(10, Math.floor(basePrice + variation + seasonal)),
            marketAvg: Math.max(10, Math.floor(basePrice + variation + 10)),
        };
    });
};

// Mock Competitors
// Mock Competitors with Actionable Links
const COMPETITORS = [
    { name: "Amazon", url: "https://www.amazon.com/s?k=portable+neck+fan", price: 12.99, rating: 4.2, shipping: "2 Days", stock: "High", type: "Marketplace" },
    { name: "AliExpress Dropshipper", url: "https://www.aliexpress.com/wholesale?catId=0&initiative_id=SB_20230101000000&SearchText=portable+neck+fan", price: 5.40, rating: 3.5, shipping: "25 Days", stock: "Med", type: "Marketplace" },
    { name: "TheOuai (Shopify)", url: "https://theouai.com", price: 45.00, rating: 4.9, shipping: "3 Days", stock: "Low", type: "BrandStore" },
    { name: "Korendy (Shopify)", url: "https://korendy.com.tr", price: 38.50, rating: 4.8, shipping: "1 Day", stock: "High", type: "BrandStore" },
];

export function CompetitorAnalysis({ price, title }: { price: number, title: string }) {
    const { dict } = useLanguage();
    const historyData = generatePriceHistory(price);
    const lowestPrice = Math.min(...historyData.map(d => d.marketAvg));
    const isGoodPrice = price <= lowestPrice * 1.1;

    return (
        <Card className="border-indigo-500/20 bg-indigo-500/5">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <TrendingUp className="h-5 w-5 text-indigo-500" />
                            {dict.product.competitor?.title || "Deep Competitor Intelligence"}
                        </CardTitle>
                        <CardDescription>
                            {dict.product.competitor?.desc || "Real-time market analysis and price tracking."}
                        </CardDescription>
                    </div>
                    <Badge variant={isGoodPrice ? "default" : "destructive"} className={isGoodPrice ? "bg-green-500/20 text-green-500 hover:bg-green-500/30" : ""}>
                        {isGoodPrice ? (dict.product.competitor?.goodPrice || "Competitive Price") : (dict.product.competitor?.badPrice || "Overpriced")}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-8">

                {/* 1. PRICE HISTORY CHART */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <h4 className="font-semibold text-muted-foreground">{dict.product.competitor?.chartTitle || "6-Month Price Trend"}</h4>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1 text-xs">
                                <div className="w-2 h-2 rounded-full bg-indigo-500" /> {dict.product.competitor?.you || "You"}
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                                <div className="w-2 h-2 rounded-full bg-zinc-500" /> {dict.product.competitor?.marketAvg || "Market Avg"}
                            </div>
                        </div>
                    </div>
                    <div className="h-[200px] w-full bg-card/50 rounded-lg p-2 border border-border/50">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={historyData}>
                                <defs>
                                    <linearGradient id="colorMyPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "8px" }}
                                    itemStyle={{ color: "#e4e4e7" }}
                                />
                                <Area type="monotone" dataKey="myPrice" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorMyPrice)" />
                                <Area type="monotone" dataKey="marketAvg" stroke="#71717a" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. COMPETITOR MATRIX */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-muted-foreground flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" /> {dict.product.competitor?.comparison || "Market Comparison"}
                    </h4>
                    <div className="rounded-xl border border-border/50 overflow-x-auto">
                        <table className="w-full text-sm text-left min-w-[500px]">
                            <thead className="bg-muted/50 text-muted-foreground font-medium uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3">{dict.product.competitor?.table?.vendor || "Vendor"}</th>
                                    <th className="px-4 py-3">{dict.product.competitor?.table?.price || "Price"}</th>
                                    <th className="px-4 py-3">{dict.product.competitor?.table?.rating || "Rating"}</th>
                                    <th className="px-4 py-3">{dict.product.competitor?.table?.shipping || "Shipping"}</th>
                                    <th className="px-4 py-3">{dict.product.competitor?.table?.stock || "Stock"}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {/* USER (YOU) */}
                                <tr className="bg-indigo-500/10 font-bold">
                                    <td className="px-4 py-3 flex items-center gap-2">
                                        <div className="h-2 w-2 bg-indigo-500 rounded-full" />
                                        Your Store
                                    </td>
                                    <td className="px-4 py-3 text-indigo-400">${price}</td>
                                    <td className="px-4 py-3">4.9 ⭐</td>
                                    <td className="px-4 py-3">5-8 Days</td>
                                    <td className="px-4 py-3 text-green-500">Available</td>
                                </tr>
                                {/* MOCK COMPETITORS */}
                                {COMPETITORS.map((c, i) => (
                                    <tr key={i} className="hover:bg-muted/30 transition-colors group">
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col">
                                                <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-medium text-slate-200 hover:text-blue-400 hover:underline flex items-center gap-1 transition-colors">
                                                    {c.name} <Truck className="h-3 w-3 opacity-50" />
                                                </a>
                                                <span className="text-[10px] text-muted-foreground">{c.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-mono">${c.price}</td>
                                        <td className="px-4 py-3 text-yellow-500">{c.rating} ⭐</td>
                                        <td className="px-4 py-3 text-xs">{c.shipping}</td>
                                        <td className="px-4 py-3">
                                            {c.stock === "Low" ? (
                                                <span className="text-red-500 flex items-center gap-1 text-xs font-bold">
                                                    <AlertTriangle className="h-3 w-3" /> Low
                                                </span>
                                            ) : (
                                                <span className="text-zinc-500 text-xs">{c.stock}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 3. COMPETITOR AD TRACKER (NEW) */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-muted-foreground flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-indigo-500" />
                        {dict.product.competitor?.adTracker?.title || "Live Competitor Ads"}
                    </h4>
                    <p className="text-xs text-muted-foreground -mt-2">
                        {dict.product.competitor?.adTracker?.subtitle || "See what ads your competitors are running right now."}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Mock Ad 1 - Meta Link */}
                        <a
                            href={`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&q=${encodeURIComponent(title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-card border border-border/50 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all block group"
                        >
                            <div className="p-3 flex items-center gap-3 border-b border-border/50 bg-muted/20">
                                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">A</div>
                                <div>
                                    <p className="text-sm font-bold group-hover:text-blue-400 transition-colors">Amazon Basic</p>
                                    <p className="text-[10px] text-muted-foreground">Sponsored • FB/Insta</p>
                                </div>
                            </div>
                            <div className="p-4 space-y-3">
                                <p className="text-sm">Don't overpay for {title}. Get the best quality for the lowest price today! 🚀 #deal</p>
                                <div className="aspect-video bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-600">
                                    <span className="text-xs">Video Creative</span>
                                </div>
                                <div className="flex items-center justify-between text-xs pt-2">
                                    <span className="text-green-400">
                                        ● {dict.product.competitor?.adTracker?.activeDays}: 12
                                    </span>
                                    <Button size="sm" variant="secondary" className="h-7 text-xs pointer-events-none">
                                        {dict.product.competitor?.adTracker?.cta}
                                    </Button>
                                </div>
                            </div>
                        </a>

                        {/* Mock Ad 2 - TikTok Link */}
                        <a
                            href={`https://ads.tiktok.com/business/creative-center/inspiration/top-ads/pc/en?keyword=${encodeURIComponent(title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-card border border-border/50 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all block group"
                        >
                            <div className="p-3 flex items-center gap-3 border-b border-border/50 bg-muted/20">
                                <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs">P</div>
                                <div>
                                    <p className="text-sm font-bold group-hover:text-pink-400 transition-colors">Premium Brand X</p>
                                    <p className="text-[10px] text-muted-foreground">Sponsored • TikTok</p>
                                </div>
                            </div>
                            <div className="p-4 space-y-3">
                                <p className="text-sm">Experience luxury with the new {title}. Limited stock available! ✨</p>
                                <div className="aspect-video bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-600">
                                    <span className="text-xs">Image Creative</span>
                                </div>
                                <div className="flex items-center justify-between text-xs pt-2">
                                    <span className="text-yellow-400">
                                        ● {dict.product.competitor?.adTracker?.activeDays}: 3
                                    </span>
                                    <Button size="sm" variant="secondary" className="h-7 text-xs pointer-events-none">
                                        {dict.product.competitor?.adTracker?.cta}
                                    </Button>
                                </div>
                            </div>
                        </a>

                        {/* Mock Ad 3 (Meta Specific) - Meta Link */}
                        <a
                            href={`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&q=${encodeURIComponent(title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-card border border-border/50 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all md:col-span-2 lg:col-span-1 block group"
                        >
                            <div className="p-3 flex items-center gap-3 border-b border-border/50 bg-blue-500/10">
                                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">M</div>
                                <div>
                                    <p className="text-sm font-bold group-hover:text-blue-400 transition-colors">Viral Gadgets Store</p>
                                    <p className="text-[10px] text-blue-400 font-bold">Sponsored • Meta Ads</p>
                                </div>
                            </div>
                            <div className="p-4 space-y-3">
                                <p className="text-sm">🔥 50% OFF! The {title} that went viral is finally back in stock. Free Shipping Worldwide! 🌍</p>
                                <div className="aspect-video bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-600 relative overflow-hidden group/image">
                                    <span className="text-xs">Carousel Creative</span>
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity">
                                        <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white">View Library</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-xs pt-2">
                                    <span className="text-green-500 font-bold">
                                        ● {dict.product.competitor?.adTracker?.activeDays}: 45 (Winning!)
                                    </span>
                                    <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white pointer-events-none">
                                        {dict.product.competitor?.adTracker?.cta}
                                    </Button>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
