import { Suspense } from "react";
import { getRawProducts } from "@/lib/api";
import { TrendsClient } from "@/components/trends/TrendsClient";

export const dynamic = 'force-dynamic';

export default async function TrendsPage() {
    const rawProducts = await getRawProducts();

    return (
        <Suspense fallback={<div className="p-8">Detecting Viral Trends...</div>}>
            <TrendsClient rawProducts={rawProducts} />
        </Suspense>
    );
}
