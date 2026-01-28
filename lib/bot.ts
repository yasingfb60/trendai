"use server";

import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import { supabase } from "@/lib/supabase";

const execPromise = promisify(exec);

// --- 1. COMPETITOR SPY (Python - Real World) ---
export async function execPythonScraper() {
    console.log(`🤖 SPY BOT STARTED: Launching Python Satellite...`);

    try {
        const scriptPath = path.join(process.cwd(), "scraper-bot/shop_spy.py");
        console.log(`📜 Running script: python3 ${scriptPath}`);

        const { stdout, stderr } = await execPromise(`python3 "${scriptPath}"`);

        if (stderr) {
            console.warn("⚠️ Python Script Warning/Error:", stderr);
        }

        console.log("✅ Python Script Output:", stdout);

        // Parse Output to get Count
        const countMatch = stdout.match(/💎 GEMS FOUND:\s*(\d+)/);
        const count = countMatch ? parseInt(countMatch[1]) : 0;

        return { success: true, message: "Spy mission completed", output: stdout, count };

    } catch (error: any) {
        console.error("❌ Spy Execution Failed:", error);
        return { success: false, error: error.message };
    }
}

// --- 2. SMART SEARCH (Mock Intelligence - Demo) ---
const CONTEXT_DB: Record<string, any[]> = {
    ramadan: [
        { title_en: "Luxury Velvet Prayer Rug Set", title_tr: "Lüks Kadife Seccade Seti", price: 45.00, category: "Lifestyle", image_url: "https://images.unsplash.com/photo-1583096114844-065dc69bc205?w=800&q=80" },
        { title_en: "Digital Tasbeeh Ring (Smart)", title_tr: "Akıllı Zikir Yüzüğü", price: 18.99, category: "Electronics", image_url: "https://images.unsplash.com/photo-1618360987399-j9s8a8a8a8a8?w=800&q=80" },
        { title_en: "Ramadan Kareem LED Lantern", title_tr: "Ramazan LED Feneri", price: 24.50, category: "Home", image_url: "https://images.unsplash.com/photo-1595411425732-e69c1ce3f64c?w=800&q=80" }
    ],
    valentine: [
        { title_en: "24K Gold Plated Forever Rose", title_tr: "24 Ayar Altın Kaplama Gül", price: 35.00, category: "Gifts", image_url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&q=80" },
        { title_en: "Magnetic Couple Bracelets", title_tr: "Mıknatıslı Çift Bileklikleri", price: 15.90, category: "Jewelry", image_url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80" }
    ],
    summer: [
        { title_en: "Portable Neck Fan Pro", title_tr: "Profesyonel Boyun Fanı", price: 32.00, category: "Electronics", image_url: "https://images.unsplash.com/photo-1621245389623-69025ce2b42d?w=800&q=80" },
        { title_en: "Waterproof Phone Pouch", title_tr: "Su Geçirmez Telefon Kılıfı", price: 9.99, category: "Accessories", image_url: "https://images.unsplash.com/photo-1563821033224-b5a034638753?w=800&q=80" }
    ]
};

export async function runSmartSearch(keyword: string) {
    console.log(`🧠 AI SEARCH: Contextualizing for '${keyword}'...`);

    // 1. Detect Context
    let context = "summer"; // Default
    const q = keyword.toLowerCase();

    if (q.includes("ramazan") || q.includes("ramadan") || q.includes("oruç")) context = "ramadan";
    else if (q.includes("ask") || q.includes("love") || q.includes("sevgili") || q.includes("valentine")) context = "valentine";

    console.log(`🌍 CONTEXT DETECTED: ${context.toUpperCase()}`);

    // 2. Fetch Simulations
    const winners = CONTEXT_DB[context] || CONTEXT_DB["summer"];

    // 3. Insert specific "Search Results" into main Products table (simulating finding them)
    const productsToInsert = winners.map(w => ({
        title_en: w.title_en,
        title_tr: w.title_tr,
        price: w.price,
        image_url: w.image_url,
        category: w.category,
        is_active: true
        // In a real app we would add 'search_tags': [context]
    }));

    const { error } = await supabase.from('products').insert(productsToInsert);

    if (error) {
        console.error("❌ DB Error:", error);
        return { success: false, error: error.message };
    }

    return { success: true, count: productsToInsert.length, context };
}
