"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ArbitrageTableProps {
    products: Product[];
}

export function ArbitrageTable({ products }: ArbitrageTableProps) {
    const { dict } = useLanguage();

    // Helper: Identify Best Arbitrage Opportunity
    // Logic: Find lowest supplier price -> Find highest cultural fit / demand country
    const getArbitrageData = (product: Product) => {
        // 1. Source: Lowest Supplier Price
        const cheapSupplier = product.suppliers?.length > 0
            ? product.suppliers.reduce((min, s) => s.pricePerUnit < min.pricePerUnit ? s : min, product.suppliers[0])
            : null;

        // 2. Target: Best Cultural Fit (High Demand)
        const targetMarket = product.culturalFit?.length > 0
            ? product.culturalFit.reduce((max, c) => c.matchScore > max.matchScore ? max : c, product.culturalFit[0])
            : null;

        const sourcePrice = cheapSupplier ? cheapSupplier.pricePerUnit : product.price * 0.4; // Fallback 40% cost
        const margin = product.price - sourcePrice;
        const marginPercent = Math.round((margin / product.price) * 100);

        return {
            sourceCountry: cheapSupplier?.location || (dict.common?.chinaEst || "China (Est.)"),
            sourcePrice: sourcePrice,
            targetCountry: targetMarket?.countryName || (dict.common?.global || "Global"),
            targetFlag: targetMarket?.countryCode || "GL",
            matchScore: targetMarket?.matchScore || 0,
            margin: margin,
            marginPercent: marginPercent,
            isViral: product.metrics.saturationScore < 40 && product.metrics.dailySales > 50
        };
    };

    return (
        <div className="w-full bg-slate-950/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-400">
                            <th className="p-4 font-medium">{dict.arbitrage?.table.product}</th>
                            <th className="p-4 font-medium">{dict.arbitrage?.table.buyIn}</th>
                            <th className="p-4 font-medium text-center"><ArrowRight className="inline h-4 w-4" /></th>
                            <th className="p-4 font-medium">{dict.arbitrage?.table.sellIn}</th>
                            <th className="p-4 font-medium">{dict.arbitrage?.table.margin}</th>
                            <th className="p-4 font-medium">{dict.arbitrage?.table.demand}</th>
                            <th className="p-4 font-medium text-right">{dict.arbitrage?.table.action}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {products.map((product) => {
                            const arb = getArbitrageData(product);

                            return (
                                <tr key={product.id} className="group hover:bg-slate-900/40 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg overflow-hidden bg-slate-800">
                                                <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors line-clamp-1 w-40 sm:w-auto">
                                                    {product.title}
                                                </p>
                                                <p className="text-xs text-slate-500">{product.category}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="font-mono text-green-400 font-bold">${arb.sourcePrice.toFixed(2)}</span>
                                            <span className="text-xs text-slate-500">{arb.sourceCountry}</span>
                                        </div>
                                    </td>

                                    <td className="p-4 text-center opacity-20 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className="inline h-4 w-4 text-slate-500" />
                                    </td>

                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="font-mono text-white font-bold">${product.price}</span>
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <span className="font-bold text-slate-300">{arb.targetCountry}</span>
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <Badge variant="outline" className={`font-mono ${arb.marginPercent > 60 ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-slate-700 text-slate-400'}`}>
                                            {arb.marginPercent}% (${arb.margin.toFixed(2)})
                                        </Badge>
                                    </td>

                                    <td className="p-4">
                                        {arb.isViral ? (
                                            <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20 gap-1">
                                                <TrendingUp className="h-3 w-3" /> {dict.common?.viral || "Viral"}
                                            </Badge>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500 rounded-full"
                                                        style={{ width: `${arb.matchScore}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-slate-400">{arb.matchScore}%</span>
                                            </div>
                                        )}
                                    </td>

                                    <td className="p-4 text-right">
                                        <Link href={`/product/${product.id}`}>
                                            <Button size="sm" variant="ghost" className="hover:bg-blue-500/10 hover:text-blue-400">
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
