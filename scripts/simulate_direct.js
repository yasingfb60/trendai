
const { createClient } = require('@supabase/supabase-js');

// Hardcoded for reliability in this script only (taken from .env.local check)
const supabaseUrl = "https://tqxfrqzrlbmvegwmktvm.supabase.co";
// Using the SERVICE_ROLE_KEY to bypass RLS
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeGZycXpybGJtdmVnd21rdHZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTMyNzc5OCwiZXhwIjoyMDg0OTAzNzk4fQ.pPf2DpKe6sxZlfim1f1fPMadwV3BCoxSR5H_fdOAvuU";

const supabase = createClient(supabaseUrl, supabaseKey);

async function simulate() {
    console.log("🔥 SIMULATING VIRAL TREND (Direct Mode)...");

    const viralProduct = {
        title: "Flying Boomerang Ball (Viral)",
        price: 12.99,
        handle: "flying-boomerang-ball-viral-test",
        image_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
        published_at: new Date().toISOString(),
        is_hot: true,
        detected_at: new Date().toISOString()
    };

    const stores = [
        { id: "store_A", name: "GadgetHeaven" },
        { id: "store_B", name: "TikTokFinds" },
        { id: "store_C", name: "TrendMaster" }
    ];

    for (const store of stores) {
        // 1. Ensure store exists
        const { data: storeData, error: storeError } = await supabase.from('monitored_stores').upsert({
            url: `https://${store.id}.com`,
            name: store.name,
            status: 'active'
        }, { onConflict: 'url' }).select().single();

        if (storeError) {
            console.error("Store Error:", storeError);
            continue;
        }

        // 2. Insert product
        const { error: prodError } = await supabase.from('competitor_products').upsert({
            store_id: storeData.id,
            external_id: `prod_${store.id}_999_viral`,
            ...viralProduct
        }, { onConflict: 'store_id,external_id' });

        if (prodError) console.error("Product Insert Error:", prodError.message);
        else console.log(`✅ Added to ${store.name}`);
    }

    console.log("🏁 DONE. Exiting.");
}

simulate();
