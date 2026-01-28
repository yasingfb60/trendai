"use client";

import { Button } from "@/components/ui/button";
import { runSmartSearch } from "@/lib/bot";
import { useState } from "react";
import { Loader2, Search, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

export function BotTrigger() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleRun() {
        const keyword = prompt("Hangi konsept için ürün arıyorsunuz? (Örn: Ramazan, Sevgililer Günü, Yaz)");
        if (!keyword) return;

        setLoading(true);
        try {
            const result = await runSmartSearch(keyword);

            if (result.success) {
                alert(`✅ Arama Tamamlandı!\n\nBulunan: ${result.count || 0} Ürün\nKonsept: ${result.context}`);
                router.refresh();
            } else {
                alert("Hata: " + result.error);
            }
        } catch (e) {
            alert("Arama sırasında hata oluştu.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            onClick={handleRun}
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white gap-2 shadow-lg shadow-orange-500/30 border border-orange-400/50 h-10 px-6 animate-pulse hover:animate-none transition-all transform hover:scale-105"
        >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Rocket className="h-5 w-5" />}
            <span className="font-bold text-base tracking-wide">{loading ? "Yapay Zeka Arıyor..." : "AKILLI KONSEPT ARAMA (AI)"}</span>
        </Button>
    );
}
