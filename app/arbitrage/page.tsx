import { Suspense } from "react";
import { getRawProducts } from "@/lib/api";
import { ArbitrageClient } from "@/components/arbitrage/ArbitrageClient";

export const dynamic = 'force-dynamic';

export default async function ArbitragePage() {
    const rawProducts = await getRawProducts();

    return (
        <Suspense fallback={
            <div className="flex h-screen items-center justify-center bg-black text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
                    <p className="text-sm text-slate-400">Scanning Global Markets...</p>
                </div>
            </div>
        }>
            <ArbitrageClient rawProducts={rawProducts} />
        </Suspense>
    );
}
