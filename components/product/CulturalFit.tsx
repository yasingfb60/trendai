"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CulturalFitReport } from "@/types";
import { CheckCircle2, AlertTriangle, MapPin } from "lucide-react";

export function CulturalFit({ reports }: { reports: CulturalFitReport[] }) {
    const { dict } = useLanguage();

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {dict.product.cultural.title}
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
                {reports.map((report) => (
                    <Card key={report.countryCode} className="border-l-4 border-l-primary/50 overflow-hidden">
                        <CardHeader className="bg-muted/30 pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">{getFlagEmoji(report.countryCode)}</span>
                                    <CardTitle>{report.countryName}</CardTitle>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${report.matchScore > 80 ? "bg-green-500/20 text-green-400" :
                                        report.matchScore > 50 ? "bg-yellow-500/20 text-yellow-400" :
                                            "bg-red-500/20 text-red-400"
                                    }`}>
                                    {report.matchScore}% {dict.product.cultural.match}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            <p className="text-sm italic text-muted-foreground border-l-2 pl-3">
                                "{report.reasoning}"
                            </p>

                            <div className="space-y-2">
                                <h4 className="text-xs uppercase font-bold text-muted-foreground">{dict.product.cultural.whySells}</h4>
                                <ul className="space-y-1">
                                    {report.sellingPoints.map((point, i) => (
                                        <li key={i} className="text-sm flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-xs uppercase font-bold text-muted-foreground">{dict.product.cultural.watchOut}</h4>
                                <ul className="space-y-1">
                                    {report.painPoints.map((point, i) => (
                                        <li key={i} className="text-sm flex items-start gap-2">
                                            <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}
