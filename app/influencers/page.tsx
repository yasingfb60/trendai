import { Suspense } from "react";
import { getInfluencers } from "@/lib/api";
import { InfluencerClient } from "@/components/influencer/InfluencerClient";

export const dynamic = 'force-dynamic';

export default async function InfluencerPage() {
    const influencers = await getInfluencers();

    return (
        <Suspense fallback={
            <div className="flex h-screen items-center justify-center bg-black text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-pink-500"></div>
                    <p className="text-sm text-slate-400">Finding Creators...</p>
                </div>
            </div>
        }>
            <InfluencerClient initialInfluencers={influencers} />
        </Suspense>
    );
}
