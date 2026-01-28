"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

export function BotTrigger() {
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const router = useRouter();

    function handleSearch() {
        if (!keyword) return;
        setOpen(false);
        // Direct to the dashboard with the query. The "Smart Search" on the dashboard will handle the rest.
        router.push(`/?q=${encodeURIComponent(keyword)}`);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white gap-2 shadow-lg shadow-orange-500/30 border border-orange-400/50 h-10 px-6 animate-pulse hover:animate-none transition-all transform hover:scale-105">
                    <Rocket className="h-5 w-5" />
                    <span className="font-bold text-base tracking-wide">AKILLI KONSEPT ARAMA (AI)</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 text-white border-slate-700">
                <DialogHeader>
                    <DialogTitle>Yapay Zeka Konsept Arama</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Hangi konsept için ürün arıyorsunuz? (Örn: "Ramazan", "Sevgililer Günü", "Yaz Tatili")
                        <br />
                        <span className="text-xs text-orange-400">*AI; başlık, kategori ve kültürel notları tarayacaktır.</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-2 mt-4">
                    <Input
                        placeholder="Konsept girin..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="bg-slate-800 border-slate-700 text-white"
                        autoFocus
                    />
                    <Button onClick={handleSearch} className="bg-blue-600 text-white">Ara</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
