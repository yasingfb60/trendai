"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle2, Star } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";

export function ReviewAnalyzer({ productName }: { productName: string }) {
    const { lang } = useLanguage();

    // Dynamic Content Generator based on Product Name/Category
    const generateContent = () => {
        const isFashion = ["Fashion", "Clothing", "Wearable"].some(k => productName.includes(k));
        const isTech = ["Electronics", "Gadget", "Smart", "Phone", "Watch"].some(k => productName.includes(k));
        const isBeauty = ["Beauty", "Skin", "Care", "Face"].some(k => productName.includes(k));

        if (lang === 'tr') {
            if (isFashion) return {
                title: "AI Yorum Kararı",
                analyzed: "Son 850 yorum analiz edildi",
                sentimentTitle: "Memnuniyet Puanı",
                sentimentDesc: (<span>Kumaş kalitesi ve duruşu <span className="text-green-600 font-bold">Çok Beğenildi</span>.</span>),
                love: "Öne Çıkanlar",
                hate: "Gelişim Alanları",
                insightTitle: "Kritik İçgörü: Beden",
                insightDesc: "Kalıplar standarttan biraz dar. Müşterilerin %40'ı bir beden büyük almayı öneriyor.",
                pros: ["Kumaş kalitesi yıkamada bozulmuyor", "Dikişler çok sağlam", "Fotoğraftaki ile birebir aynı"],
                cons: ["Kargolama süresi ortalamanın üzerinde", "Paketleme daha özenli olabilirdi"]
            };
            if (isTech) return {
                title: "AI Teknik Analiz",
                analyzed: "Son 2,100 yorum analiz edildi",
                sentimentTitle: "Performans Puanı",
                sentimentDesc: (<span>Fiyat/Performans oranı <span className="text-blue-600 font-bold">Mükemmel</span> bulundu.</span>),
                love: "Kullanıcı Favorileri",
                hate: "Teknik Sorunlar",
                insightTitle: "Kritik İçgörü: Batarya",
                insightDesc: "Batarya süresi ilk 3 şarjdan sonra optimize oluyor. Kullanım kılavuzunda bu belirtilmeli.",
                pros: ["Bağlantı hızı çok yüksek", "Malzeme kalitesi premium hissettiriyor", "Kurulum çok basit"],
                cons: ["Şarj kablosu biraz kısa", "Tuş hassasiyeti alışma gerektiriyor"]
            };
            // Default General
            return {
                title: "AI Pazar Analizi",
                analyzed: "Piyasadaki 500+ yorum tarandı",
                sentimentTitle: "Genel Memnuniyet",
                sentimentDesc: (<span>Kullanıcılar bu ürünü <span className="text-green-600 font-bold">Fiyatına Değer</span> buluyor.</span>),
                love: "Neyi Sevdiler",
                hate: "Neden Şikayetçiler",
                insightTitle: "Satış İpucu",
                insightDesc: "Hediye olarak alan kullanıcı sayısı %30. Hediye paketi seçeneği eklemek dönüşümü artırabilir.",
                pros: ["Fiyat avantajı yüksek", "Günlük kullanım için ideal", "Dayanıklı yapı"],
                cons: ["Kullanım kılavuzu yetersiz", "Renk seçenekleri sınırlı"]
            };
        } else {
            // EN Fallback
            return {
                title: "AI Review Verdict",
                analyzed: "Analyzed 1000+ reviews",
                sentimentTitle: "Sentiment Score",
                sentimentDesc: (<span>Customers find this <span className="text-green-600 font-bold">Great Value</span>.</span>),
                love: "Pros",
                hate: "Cons",
                insightTitle: "Critical Insight",
                insightDesc: "High gifting potential. Consider adding gift wrapping options.",
                pros: ["Great price point", "Durable build", "Fast shipping"],
                cons: ["Limited colors", "Manual is unclear"]
            };
        }
    };

    const t = generateContent();
    const sentimentScore = 82; // 0-100

    return (
        <Card className="border-purple-500/20 bg-purple-500/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    {t.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground">{t.analyzed}</p>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* Sentiment Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                        <span>{t.sentimentTitle}</span>
                        <span className="text-purple-600 font-bold">{sentimentScore}/100</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-400 to-green-500 w-[82%]" />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                        {t.sentimentDesc}
                    </p>
                </div>

                {/* Pros & Cons - Horizontal Layout for Full Width */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-green-700 bg-green-50 p-2 rounded-lg">
                            <ThumbsUp className="h-4 w-4" /> {t.love}
                        </h4>
                        <ul className="space-y-2 pl-1">
                            {t.pros.map((pro, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex gap-2 items-start">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0 mt-0.5" />
                                    <span className="leading-tight">{pro}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-red-700 bg-red-50 p-2 rounded-lg">
                            <ThumbsDown className="h-4 w-4" /> {t.hate}
                        </h4>
                        <ul className="space-y-2 pl-1">
                            {t.cons.map((con, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex gap-2 items-start">
                                    <AlertTriangle className="h-3.5 w-3.5 text-red-600 shrink-0 mt-0.5" />
                                    <span className="leading-tight">{con}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* AI Warning */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0" />
                    <div>
                        <p className="text-xs font-bold text-yellow-800">{t.insightTitle}</p>
                        <p className="text-xs text-yellow-700 mt-1">
                            {t.insightDesc}
                        </p>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
