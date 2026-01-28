"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, AlertCircle, CheckCircle2 } from "lucide-react";

export function AdIntelligence({ activeCountries }: { activeCountries: string[] }) {
    const { dict } = useLanguage();

    // Define your target markets list (as user requested)
    const myTargets = ["TR", "SA", "AE", "US", "GB", "DE", "JP", "KR"];

    // Find markets where product has NO ads (Blue Ocean)
    const blueOceanMarkets = myTargets.filter(target => !activeCountries.includes(target));

    function getFlagEmoji(countryCode: string) {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }

    return (
        <Card className="border-blue-500/20 shadow-lg shadow-blue-500/5">
            <CardHeader className="pb-3 pt-4">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Megaphone className="h-4 w-4 text-blue-500" />
                    {dict.product.ads.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pb-4">

                {/* Active Countries List - Compact */}
                <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">{dict.product.ads.activeIn}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {activeCountries.map(code => (
                            <span key={code} className="flex items-center gap-1 px-2 py-0.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-md text-xs font-bold">
                                {getFlagEmoji(code)} {code}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Opportunity Alert - Compact */}
                {blueOceanMarkets.length > 0 && (
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg space-y-2">
                        <div className="flex items-center gap-2 text-green-600">
                            <AlertCircle className="h-4 w-4 animate-pulse" />
                            <span className="font-bold text-xs">{dict.product.ads.opportunity}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {blueOceanMarkets.map(code => (
                                <span key={code} className="flex items-center gap-1 px-2 py-0.5 bg-green-600 text-white rounded-md text-[10px] font-bold shadow-sm">
                                    {getFlagEmoji(code)} {code}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

            </CardContent>
        </Card>
    );
}
