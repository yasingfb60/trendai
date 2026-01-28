
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual Env Parsing
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
} else {
    console.error("No .env.local file found at:", envPath);
    process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase Env Vars!");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log("Testing connection to:", supabaseUrl);

    // 1. Check Products (Should exist)
    const { data: products, error: pError } = await supabase.from('products').select('id').limit(1);
    if (pError) {
        console.error("Products Fetch Error:", pError);
    } else {
        console.log("Products Table: OK - Found", products?.length);
    }

    // 2. Check Influencers (Suspected Issue)
    const { data: influencers, error: iError } = await supabase.from('influencers').select('*').limit(5);
    if (iError) {
        console.error("Influencers Fetch Error:", JSON.stringify(iError, null, 2));
    } else {
        console.log("Influencers Table: OK - Found", influencers?.length);
        if (influencers && influencers.length > 0) {
            console.log("Sample:", influencers[0].handle);
        } else {
            console.log("WARNING: Influencers table exists but is empty.");
        }
    }
}

testConnection();
