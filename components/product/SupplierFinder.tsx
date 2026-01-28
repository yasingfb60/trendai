"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Supplier } from "@/types";
import { BadgeCheck, Factory, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SupplierFinder({ suppliers }: { suppliers: Supplier[] }) {
    const { dict } = useLanguage();

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
                <Factory className="h-5 w-5 text-primary" />
                {dict.product.supplier.title}
            </h3>

            <div className="space-y-3 h-full flex flex-col">
                {suppliers.map((supplier) => (
                    <Card key={supplier.id} className="hover:bg-accent/50 transition-colors flex-1">
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="flex gap-4">
                                <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                                    <span className="text-lg font-bold text-muted-foreground">{supplier.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold">{supplier.name}</h4>
                                        {supplier.verified && <BadgeCheck className="h-4 w-4 text-blue-500" />}
                                    </div>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                        <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[10px] uppercase">{supplier.type}</span>
                                        • {supplier.location}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <p className="text-sm font-medium">{dict.product.supplier.moq}</p>
                                    <p className="text-lg font-bold">{supplier.moq} pcs</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">{dict.product.supplier.priceUnit}</p>
                                    <p className="text-lg font-bold text-green-500">${supplier.pricePerUnit}</p>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium">{dict.product.supplier.leadTime}</p>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <Truck className="h-3 w-3" />
                                        <span className="text-sm">{supplier.leadTime}</span>
                                    </div>
                                </div>
                                <Button size="sm">{dict.product.supplier.connect}</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
