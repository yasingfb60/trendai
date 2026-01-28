
import { createClient } from '@supabase/supabase-js'
import 'server-only';
import dotenv from 'dotenv';
import path from 'path';

// Manual env loading for resilience
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
        dotenv.config({ path: path.join(process.cwd(), '.env.local') });
    } catch (e) {
        console.error("Failed to load .env.local", e);
    }
}

// Fallback to placeholder to prevent import-time crash
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tqxfrqzrlbmvegwmktvm.supabase.co";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseServiceRoleKey) {
    console.error("CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing even after manual load.");
}

// Admin client with full privileges (Bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
