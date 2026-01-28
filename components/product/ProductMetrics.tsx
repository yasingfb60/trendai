"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductMetrics as MetricsType } from "@/types";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function ProductMetrics({ metrics }: { metrics: MetricsType }) {
    const { dict } = useLanguage();

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 col-span-full">
            {/* Key Stats Row */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{dict.product.metrics.monthlyRev}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${metrics.monthlyRevenue.toLocaleString()}</div>
                    <p className="text-xs text-green-500">+12% {dict.dashboard.month}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{dict.product.metrics.grossMargin}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{metrics.grossMargin}%</div>
                    <p className="text-xs text-muted-foreground">{dict.product.metrics.highProf}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{dict.product.metrics.roas}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-500">{metrics.roas}x</div>
                    <p className="text-xs text-muted-foreground">{metrics.activeAds} {dict.product.metrics.activeAds}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{dict.product.metrics.saturation}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-orange-500">{metrics.saturationScore}/100</div>
                    <p className="text-xs text-muted-foreground">{dict.product.metrics.medComp}</p>
                </CardContent>
            </Card>
        </div>
    );
}

export function SalesTrendChart({ metrics }: { metrics: MetricsType }) {
    const { dict } = useLanguage();

    return (
        <Card className="col-span-full w-full">
            <CardHeader>
                <CardTitle>{dict.product.metrics.salesTrend}</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metrics.salesHistory}>
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" hide />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
                            itemStyle={{ color: "#fff" }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
