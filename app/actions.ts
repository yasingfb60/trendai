"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { analyzeViralTrends } from "@/lib/trend-engine";

export async function fetchSpyFeed() {
    try {
        const { data, error } = await supabaseAdmin
            .from('competitor_products')
            .select(`
                *,
                monitored_stores (
                    name,
                    url
                )
            `)
            .order('detected_at', { ascending: false })
            .limit(20);

        if (error) {
            console.error("Spy Fetch Error (Admin):", error);
            return [];
        }

        return data?.map((p: any) => ({
            id: p.id,
            store_name: p.monitored_stores?.name || "Unknown Store",
            store_url: p.monitored_stores?.url,
            title: p.title,
            price: Number(p.price),
            image_url: p.image_url,
            published_at: p.published_at,
            detected_at: p.detected_at,
            handle: p.handle
        })) || [];
    } catch (e) {
        console.error("Spy Feed Action Failed:", e);
        return [];
    }
}

export async function checkViralTrends() {
    try {
        const trends = await analyzeViralTrends();
        return trends;
    } catch (e) {
        console.error("Trend Check Failed:", e);
        return [];
    }
}
