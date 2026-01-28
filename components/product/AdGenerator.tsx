"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Copy, Wand2, Calculator } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";

export function AdGenerator({ product }: { product: Product }) {
    const [platform, setPlatform] = useState("tiktok");

    // Dynamic Templates
    const templates: Record<string, string> = {
        tiktok: `🔥 ${product.title} - Sadece ${product.price} TL! \n\nKeşfetmeye hazır mısın? 🛑 ${product.category} kategorisinin en gözde ürünü burada.\n\n✅ Stoklarla Sınırlı\n✅ Hızlı Kargo\n✅ İnanılmaz Fiyat: ${product.price} ${product.currency}\n\nKaçırmamak için hemen tıkla! 👇\n[LİNK]`,
        instagram: `✨ ${product.title} ile Tarzını Yansıt! ✨\n\n${product.description ? product.description.slice(0, 100) + "..." : "Hayatınızı kolaylaştıracak mükemmel tasarım."}\n\n💖 ${product.category} tutkunları buna bayılıyor!\n📦 Ücretsiz Kargo Fırsatı\n💸 Fiyat: ${product.price} ${product.currency}\n\nProfildeki linke tıkla ve incele! 🛍️ #trend #fırsat #${product.category.replace(/\s/g, '').toLowerCase()}`,
        facebook: `DİKKAT! 📢\n\n${product.title} İndirimde!\n\n${product.category} arayanlar için kaçırılmayacak fırsat. \n\nNormal Fiyat: ${(product.price * 1.5).toFixed(2)} ${product.currency}\nÖZEL FİYAT: ${product.price} ${product.currency} 😱\n\n👉 "Şimdi Satın Al" butonuna tıklayın ve avantajlı fiyatı yakalayın.\n\nStoklar tükenmeden yetişin!`
    };

    return (
        <Card className="border-blue-500/20 bg-blue-500/5">
            <CardHeader className="pb-3 pt-4">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Wand2 className="h-4 w-4 text-blue-500" />
                    AI Reklam Yazarı
                </CardTitle>
                <p className="text-xs text-muted-foreground">{product.title} için platforma özel içerik üretiliyor</p>
            </CardHeader>
            <CardContent>
                {/* Custom Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2 bg-transparent p-0">
                        <button
                            onClick={() => setPlatform("tiktok")}
                            className={`px-6 py-2 rounded-full border text-sm font-medium transition-all shadow-sm ${platform === "tiktok"
                                    ? "bg-black text-white border-black scale-105"
                                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            TikTok
                        </button>
                        <button
                            onClick={() => setPlatform("instagram")}
                            className={`px-6 py-2 rounded-full border text-sm font-medium transition-all shadow-sm ${platform === "instagram"
                                    ? "bg-pink-600 text-white border-pink-600 scale-105"
                                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            Instagram
                        </button>
                        <button
                            onClick={() => setPlatform("facebook")}
                            className={`px-6 py-2 rounded-full border text-sm font-medium transition-all shadow-sm ${platform === "facebook"
                                    ? "bg-blue-600 text-white border-blue-600 scale-105"
                                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            Facebook
                        </button>
                    </div>

                    <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                        onClick={() => navigator.clipboard.writeText(templates[platform])}
                    >
                        <Copy className="h-4 w-4 mr-2" />
                        Kopyala
                    </Button>
                </div>

                {/* Editor Area */}
                <div className="relative">
                    <textarea
                        className="w-full h-[500px] p-6 rounded-xl border-2 bg-card text-base font-mono leading-relaxed resize-none focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none shadow-sm"
                        value={templates[platform]}
                        readOnly
                    />
                </div>

                <div className="mt-3 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-primary gap-2">
                        <Wand2 className="h-4 w-4" />
                        Yapay Zeka ile Yeniden Yaz
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
