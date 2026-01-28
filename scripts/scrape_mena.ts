
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
const isCI = process.env.CI === 'true';
try { dotenv.config({ path: path.join(process.cwd(), '.env.local') }); } catch (e) { }

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) { process.exit(1); }
const supabase = createClient(supabaseUrl, supabaseKey);

async function scrapeMena() {
    console.log("🇸🇦 Starting MENA / Amazon SA Scraper...");

    // Simulating Amazon SA Hot New Releases
    const menaTrends = [
        { title: "Arabic Coffee Maker (Dallah)", category: "Home", price: 150, currency: 'SAR' },
        { title: "Oudh Perfume Oil (Premium)", category: "Beauty", price: 200, currency: 'SAR' },
        { title: "Gaming Chair with RGB", category: "Electronics", price: 800, currency: 'SAR' },
        { title: "Prayer Mat (Memory Foam)", category: "Home", price: 90, currency: 'SAR' },
        { title: "Smart Incense Burner (Bakhoor)", category: "Electronics", price: 120, currency: 'SAR' },
        { title: "Dates Gift Box (Luxury)", category: "Food", price: 150, currency: 'SAR' }
    ];

    const newProducts = menaTrends.map(t => ({
        title_en: t.title,
        title_tr: t.title, // In real app, we'd translate
        price: t.price, // Stored as is, currency field handles display
        currency: 'SAR',
        image_url: 'https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&q=80', // Desert/Luxury aesthetic
        category: t.category,
        slug: `sa-${t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        is_active: true,
        source: 'Amazon SA'
    }));

    const { data } = await supabase.from('products').upsert(newProducts, { onConflict: 'slug' }).select();

    if (data) {
        console.log(`✅ Saved ${data.length} MENA opportunities.`);
        // Auto-Patch Metrics
        for (const p of data) {
            await supabase.from('product_metrics').delete().eq('product_id', p.id);
            await supabase.from('product_metrics').insert({
                product_id: p.id,
                daily_sales: Math.floor(Math.random() * 300) + 50,
                monthly_revenue: Math.floor(Math.random() * 50000),
                gross_margin: 55,
                ad_countries: ['SA', 'AE', 'KW']
            });

            await supabase.from('cultural_insights').delete().eq('product_id', p.id);
            await supabase.from('cultural_insights').insert({
                product_id: p.id,
                country_code: 'SA',
                match_score: 88,
                reasoning_en: "High demand in Gulf region.",
                reasoning_tr: "Körfez bölgesinde yüksek talep.",
                pain_points: ["Quality authenticity"],
                selling_points: ["Cultural fit", "Luxury status"]
            });
        }
    }
}

scrapeMena();
