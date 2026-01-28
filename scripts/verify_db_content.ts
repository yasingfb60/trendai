
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

try { dotenv.config({ path: path.join(process.cwd(), '.env.local') }); } catch (e) { }

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLatest() {
    console.log("🔍 Checking Remote Database Content...");

    const { data: products, error } = await supabase
        .from('products')
        .select('id, title_en, created_at, slug')
        .order('created_at', { ascending: false })
        .limit(20);

    if (error) {
        console.error("DB Error:", error);
        return;
    }

    console.log(`Found ${products.length} recent products:`);
    products.forEach(p => {
        console.log(`- [${p.created_at.substring(0, 16)}] ${p.title_en}`);
    });

    // Check specifically for "Gift"
    const { data: gifts } = await supabase
        .from('products')
        .select('title_en')
        .ilike('title_en', '%Gift%');

    console.log("\n🎁 Products with 'Gift' in title:", gifts?.length || 0);
    if (gifts) console.table(gifts);
}

checkLatest();
