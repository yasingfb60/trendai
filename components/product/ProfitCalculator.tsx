"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Product } from "@/types";

export function ProfitCalculator({ product }: { product: Product }) {
    const { dict } = useLanguage();

    // Initialize with product values, ensuring safety (fallback to 0)
    const [price, setPrice] = useState(product.price || 0);
    const [cost, setCost] = useState(product.suppliers?.[0]?.pricePerUnit || (product.price ? product.price * 0.4 : 0));
    const [shipping, setShipping] = useState(5.00);
    const [adCost, setAdCost] = useState(15.00);

    const totalCost = cost + shipping + adCost;
    const netProfit = price - totalCost;
    const margin = (netProfit / price) * 100;

    return (
        <Card className="h-full flex flex-col justify-between">
            <CardHeader className="pb-3 pt-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Calculator className="h-5 w-5 text-primary" />
                    {dict.product.calculator.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pb-4">
                {/* Main Inputs Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Price Input */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <label className="font-medium">{dict.product.calculator.price}</label>
                            <span className="font-bold text-base">${price.toFixed(2)}</span>
                        </div>
                        <input
                            type="range"
                            min="1" max="200" step="1"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Cost Input */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <label className="font-medium">{dict.product.calculator.cost}</label>
                            <span className="font-bold text-base text-red-500">-${cost.toFixed(2)}</span>
                        </div>
                        <input
                            type="range"
                            min="1" max="100" step="0.5"
                            value={cost}
                            onChange={(e) => setCost(Number(e.target.value))}
                            className="w-full accent-red-500 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>

                {/* Secondary Inputs Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs text-muted-foreground uppercase font-bold tracking-wide">{dict.product.calculator.shipping}</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-sm text-muted-foreground">$</span>
                            <input
                                type="number"
                                value={shipping}
                                onChange={(e) => setShipping(Number(e.target.value))}
                                className="w-full bg-secondary border border-border rounded-md h-9 text-sm pl-6 font-medium text-foreground focus:ring-2 focus:ring-primary shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-muted-foreground uppercase font-bold tracking-wide">{dict.product.calculator.adCost}</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-sm text-muted-foreground">$</span>
                            <input
                                type="number"
                                value={adCost}
                                onChange={(e) => setAdCost(Number(e.target.value))}
                                className="w-full bg-secondary border border-border rounded-md h-9 text-sm pl-6 font-medium text-foreground focus:ring-2 focus:ring-primary shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Compact Result Area */}
                <div className={`p-4 rounded-xl flex items-center justify-between shadow-inner ${netProfit > 0 ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10"}`}>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{dict.product.calculator.net}</p>
                        <p className={`text-2xl font-black leading-none mt-1 ${netProfit > 0 ? "text-green-600" : "text-red-500"}`}>
                            ${netProfit.toFixed(2)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{dict.product.calculator.margin}</p>
                        <p className={`text-lg font-bold mt-1 ${margin > 20 ? "text-green-600" : "text-orange-500"}`}>
                            %{margin.toFixed(1)}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
