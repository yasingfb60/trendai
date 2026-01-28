"use client";

import Link from "next/link";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp, DollarSign } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";

export function ProductCard({ product }: { product: Product }) {
    const { dict } = useLanguage();

    return (
        <Link href={`/product/${product.id}`} className="block group">
            <Card className="h-full overflow-hidden border-border/50 bg-card/40 hover:bg-card/60 hover:border-primary/50 transition-all duration-300 transform group-hover:-translate-y-1">
                {/* Image Section */}
                <div className="relative aspect-[4/3] bg-muted/20 overflow-hidden">
                    <img
                        src={product.imageUrl || "/placeholder.jpg"}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Floating Price Tag */}
                    <div className="absolute bottom-3 right-3">
                        <Badge variant="secondary" className="font-bold text-lg bg-black/60 backdrop-blur-md border-white/10 text-white">
                            {product.currency === "USD" ? "$" : product.currency}
                            {product.price}
                        </Badge>
                    </div>
                </div>

                {/* Content Section */}
                <CardContent className="p-4 space-y-3">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                            <span>{product.category}</span>
                            <span className="flex items-center gap-1 text-green-400">
                                <TrendingUp className="h-3 w-3" />
                                {product.metrics?.saturationScore < 50 ? (dict.productCard?.lowSat || "Low Saturation") : (dict.productCard?.rising || "Rising")}
                            </span>
                        </div>
                        <h3 className="font-bold text-lg leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                            {product.title}
                        </h3>
                    </div>

                    {/* Mini Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
                            <Eye className="h-4 w-4 text-blue-400" />
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase">{dict.productCard?.interest || "Interest"}</p>
                                <p className="text-xs font-bold">{product.metrics?.dailySales || "N/A"}{dict.productCard?.day || "/day"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
                            <DollarSign className="h-4 w-4 text-green-400" />
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase">{dict.productCard?.margin || "Margin"}</p>
                                <p className="text-xs font-bold">{product.metrics?.grossMargin}%</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
