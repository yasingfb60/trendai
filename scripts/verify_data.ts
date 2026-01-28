
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) { console.error("Missing creds"); process.exit(1); }

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
    console.log("🔍 Checking Products...");

    // 1. Check if Amazon products exist
    const { data: products, error } = await supabase
        .from('products')
        .select('id, title_en, slug, category, created_at')
        // .ilike('slug', 'amz-%') // Removed specific slug check
        .order('created_at', { ascending: false })
        .limit(10);

    if (error) {
        console.error("Query Error:", error);
        return;
    }

    if (products.length === 0) {
        console.log("❌ No Amazon products found in DB!");
    } else {
        console.log(`✅ Found ${products.length} Amazon products.`);
        console.log(products);

        // 2. Check relations for the first one
        const pid = products[0].id;

        const { data: metrics } = await supabase.from('product_metrics').select('*').eq('product_id', pid);
        const { data: insights } = await supabase.from('cultural_insights').select('*').eq('product_id', pid);

        console.log(`\nChecking relations for ${products[0].title_en}:`);
        console.log(`- Metrics: ${metrics?.length || 0}`);
        console.log(`- Cultural Insights: ${insights?.length || 0}`);

        if (metrics?.length === 0 || insights?.length === 0) {
            console.log("⚠️ WARNING: Product logic requires these relations to display correctly in some views!");
        }
    }
}

checkData();
