"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instagram, Youtube, Twitter, Star, ExternalLink, Zap } from "lucide-react";

interface Influencer {
    id: string;
    handle: string;
    platform: string;
    niche: string;
    followers: number;
    engagement_rate: number;
    avg_views: number;
    estimated_cost: number;
    country_code: string;
}

interface InfluencerClientProps {
    initialInfluencers: Influencer[];
}

export function InfluencerClient({ initialInfluencers }: InfluencerClientProps) {
    const { dict } = useLanguage();
    const [filter, setFilter] = useState("All");

    const filteredInfluencers = initialInfluencers.filter(inf =>
        filter === "All" || inf.niche === filter
    );

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num;
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-black p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                        {dict.influencerDirectory?.title || "Influencer Matchmaker"}
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        {dict.influencerDirectory?.subtitle || "Find the perfect voice for your brand."}
                    </p>
                </div>

                {/* Filters */}
                <Tabs defaultValue="All" className="w-full" onValueChange={setFilter}>
                    <TabsList className="bg-slate-900 border border-slate-800 p-1 rounded-xl">
                        <TabsTrigger value="All" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-lg px-4">{dict.influencerDirectory?.filters.all}</TabsTrigger>
                        <TabsTrigger value="Tech" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg px-4">{dict.influencerDirectory?.filters.tech}</TabsTrigger>
                        <TabsTrigger value="Beauty" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-lg px-4">{dict.influencerDirectory?.filters.beauty}</TabsTrigger>
                        <TabsTrigger value="Home" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg px-4">{dict.influencerDirectory?.filters.home}</TabsTrigger>
                        <TabsTrigger value="Fitness" className="data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg px-4">{dict.influencerDirectory?.filters.fitness}</TabsTrigger>
                        <TabsTrigger value="Gaming" className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-lg px-4">{dict.influencerDirectory?.filters.gaming}</TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInfluencers.map((inf) => (
                        <Card key={inf.id} className="bg-slate-950 border-slate-800 overflow-hidden hover:border-slate-700 transition-colors group">
                            <CardContent className="p-0">
                                {/* Banner / Header */}
                                <div className={`h-24 w-full bg-gradient-to-r ${getNicheGradient(inf.niche)} opacity-20 group-hover:opacity-30 transition-opacity`} />

                                <div className="px-6 -mt-12 mb-6 flex justify-between items-end">
                                    <div className="h-24 w-24 rounded-2xl bg-slate-900 border-4 border-black flex items-center justify-center shadow-2xl relative">
                                        {inf.platform === 'Instagram' && <Instagram className="h-10 w-10 text-pink-500" />}
                                        {inf.platform === 'TikTok' && <span className="font-bold text-2xl text-white">Tk</span>}
                                        {inf.platform === 'YouTube' && <Youtube className="h-10 w-10 text-red-500" />}

                                        <div className="absolute -bottom-2 -right-2 bg-black border border-slate-800 rounded-full p-1.5">
                                            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                        </div>
                                    </div>
                                    <Button size="sm" className="rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10">
                                        <Zap className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                                        Connect
                                    </Button>
                                </div>

                                <div className="px-6 pb-6 space-y-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            {inf.handle}
                                            {/* Flag if needed */}
                                        </h3>
                                        <p className="text-sm text-slate-400">{inf.niche} • {inf.country_code}</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                                            <p className="text-xs text-slate-500 uppercase tracking-wider">{dict.product.influencer.followers}</p>
                                            <p className="font-bold text-white">{formatNumber(inf.followers)}</p>
                                        </div>
                                        <div className="text-center p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                                            <p className="text-xs text-slate-500 uppercase tracking-wider">{dict.product.influencer.engRate}</p>
                                            <p className="font-bold text-green-400">{inf.engagement_rate}%</p>
                                        </div>
                                        <div className="text-center p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                                            <p className="text-xs text-slate-500 uppercase tracking-wider">Est. Cost</p>
                                            <p className="font-bold text-white">${inf.estimated_cost}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Star className="h-3 w-3 fill-slate-500" />
                                            Verified Partner
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-blue-400 hover:text-blue-300">
                                            View Report <ExternalLink className="h-3 w-3 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

function getNicheGradient(niche: string) {
    switch (niche) {
        case 'Tech': return "from-blue-500 to-cyan-500";
        case 'Beauty': return "from-pink-500 to-rose-500";
        case 'Home': return "from-orange-500 to-amber-500";
        case 'Fitness': return "from-green-500 to-emerald-500";
        case 'Gaming': return "from-violet-500 to-purple-500";
        default: return "from-slate-500 to-gray-500";
    }
}
