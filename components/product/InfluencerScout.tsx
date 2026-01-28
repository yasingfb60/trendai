"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Influencer } from "@/types";
import { Instagram, Youtube, Users, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InfluencerScout({ influencers }: { influencers: Influencer[] }) {
    const { dict } = useLanguage();

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {dict.product.influencer.title}
            </h3>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {influencers.map((influencer) => (
                    <Card key={influencer.id} className="relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-violet-500" />
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                        {influencer.platform === "Instagram" && <Instagram className="h-5 w-5" />}
                                        {influencer.platform === "TikTok" && <span className="font-bold">Tk</span>}
                                        {influencer.platform === "YouTube" && <Youtube className="h-5 w-5" />}
                                    </div>
                                    <div>
                                        <p className="font-bold">{influencer.handle}</p>
                                        <p className="text-xs text-muted-foreground">{influencer.niche}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-xs font-bold">
                                    <Star className="h-3 w-3 fill-yellow-500" />
                                    High Match
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-dashed">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-semibold text-muted-foreground">{dict.product.influencer.roiTitle}</span>
                                    <Badge variant="outline" className="text-[10px] h-5 bg-green-500/10 text-green-600 border-green-200">
                                        {dict.product.influencer.viralBadge}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="text-center">
                                        <div className="text-muted-foreground text-xs">{dict.product.influencer.spend}</div>
                                        <div className="font-bold text-red-500">${influencer.estimatedCost}</div>
                                    </div>
                                    <div className="text-muted-foreground">➔</div>
                                    <div className="text-center">
                                        <div className="text-muted-foreground text-xs">{dict.product.influencer.getViews}</div>
                                        <div className="font-bold text-primary">
                                            {influencer.estimatedViews > 1000
                                                ? (influencer.estimatedViews / 1000).toFixed(1) + "K"
                                                : influencer.estimatedViews}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 text-[10px] text-muted-foreground border-t pt-2 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3 inline" />
                                    {influencer.platform === "TikTok" && dict.product.influencer.tips.tiktok}
                                    {influencer.platform === "Instagram" && dict.product.influencer.tips.instagram}
                                    {influencer.platform === "YouTube" && dict.product.influencer.tips.youtube}
                                    {influencer.platform === "YouTube" && dict.product.influencer.tips.youtube}
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4">
                                <div>
                                    <p className="text-xs text-muted-foreground">{dict.product.influencer.followers}</p>
                                    <p className="text-lg font-bold">
                                        {influencer.followers > 1000000
                                            ? (influencer.followers / 1000000).toFixed(1) + "M"
                                            : (influencer.followers / 1000).toFixed(1) + "K"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">{dict.product.influencer.engRate}</p>
                                    <p className="text-lg font-bold text-green-500">{influencer.engagementRate}%</p>
                                </div>
                            </div>

                            <Button className="w-full mt-4" variant="outline">{dict.product.influencer.viewProfile}</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
