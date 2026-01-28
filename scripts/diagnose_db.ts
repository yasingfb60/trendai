
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("❌ Missing Env Vars:", { supabaseUrl, hasKey: !!supabaseServiceRoleKey });
    process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

async function diagnose() {
    console.log("🔍 DIAGNOSTIC STARTED");

    // 1. Check Monitored Stores
    const { count: storeCount, error: storeError } = await supabaseAdmin
        .from('monitored_stores')
        .select('*', { count: 'exact', head: true });

    if (storeError) console.error("❌ Store Check Failed:", storeError.message);
    else console.log(`✅ Monitored Stores: ${storeCount}`);

    // 2. Check Competitor Products
    const { data: products, count: prodCount, error: prodError } = await supabaseAdmin
        .from('competitor_products')
        .select('*', { count: 'exact' })
        .limit(5);

    if (prodError) console.error("❌ Product Check Failed:", prodError.message);
    else {
        console.log(`✅ Competitor Products: ${prodCount}`);
        if (products && products.length > 0) {
            console.log("   Last Product:", products[0].title);
        } else {
            console.log("   (Table appears empty)");
        }
    }
}

diagnose();
