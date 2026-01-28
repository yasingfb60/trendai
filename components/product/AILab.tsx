"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ReviewAnalyzer } from "./ReviewAnalyzer";
import { AdGenerator } from "./AdGenerator";
import { Product } from "@/types";
import { Sparkles } from "lucide-react";

export function AILab({ product }: { product: Product }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    AI Laboratory
                </h2>
            </div>

            <Tabs defaultValue="reviews" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="reviews">Review Analysis</TabsTrigger>
                    <TabsTrigger value="ads">Ad Generator</TabsTrigger>
                </TabsList>
                <TabsContent value="reviews" className="mt-4">
                    <ReviewAnalyzer productName={product.title} />
                </TabsContent>
                <TabsContent value="ads" className="mt-4">
                    <AdGenerator product={product} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
