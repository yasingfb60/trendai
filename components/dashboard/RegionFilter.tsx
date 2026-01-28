"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { REGIONS } from "@/lib/mockData";

export function RegionFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const region = searchParams.get('region') || 'ALL';

    const handleRegionChange = (newRegion: string) => {
        const params = new URLSearchParams(searchParams);
        if (newRegion === 'ALL') {
            params.delete('region');
        } else {
            params.set('region', newRegion);
        }
        router.replace(`/?${params.toString()}`);
    }

    return (
        <div className="flex gap-2 overflow-x-auto pb-2">
            {REGIONS.map((r) => (
                <Button
                    key={r.id}
                    variant={region === r.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleRegionChange(r.id)}
                    className="rounded-full"
                >
                    <span className="mr-2">{r.emoji}</span>
                    {r.label}
                </Button>
            ))}
        </div>
    );
}
