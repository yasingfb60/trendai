import { supabaseAdmin } from "../lib/supabase-admin.ts";

async function simulate() {
    console.log("🔥 SIMULATING VIRAL TREND...");

    const viralProduct = {
        title: "Flying Boomerang Ball (Viral)",
        price: 12.99,
        handle: "flying-boomerang-ball",
        image_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
        published_at: new Date().toISOString(),
        is_hot: true,
        detected_at: new Date().toISOString()
    };

    // Insert same product for 3 DIFFERENT stores
    const stores = [
        { id: "store_A", name: "GadgetHeaven" },
        { id: "store_B", name: "TikTokFinds" },
        { id: "store_C", name: "TrendMaster" }
    ];

    for (const store of stores) {
        // 1. Ensure store exists
        await supabaseAdmin.from('monitored_stores').upsert({
            url: `https://${store.id}.com`,
            name: store.name,
            status: 'active'
        }, { onConflict: 'url' });

        // 2. Insert product
        const { error } = await supabaseAdmin.from('competitor_products').upsert({
            store_id: (await supabaseAdmin.from('monitored_stores').select('id').eq('name', store.name).single()).data!.id,
            external_id: `prod_${store.id}_999`,
            ...viralProduct
        }, { onConflict: 'store_id,external_id' });

        if (error) console.error("Insert Error:", error.message);
        else console.log(`✅ Added to ${store.name}`);
    }

    console.log("🏁 Simulation Complete. Exiting...");
    process.exit(0);
}
