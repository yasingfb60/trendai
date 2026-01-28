import os
import requests
import json
import random
from datetime import datetime
from supabase import create_client, Client
from dotenv import load_dotenv

# Load secrets
load_dotenv(dotenv_path="../.env.local")

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not url or not key:
    print("❌ Error: Missing credentials. Check .env.local")
    exit(1)

supabase: Client = create_client(url, key)

# --- MOCK SOURCES ---
# In a real scenario, this would be a URL to Amazon Best Sellers or AliExpress API
# For stability, we simulate a "Smart Search" that returns relevant results based on keywords.

MOCK_DATABASE = {
    "ramadan": [
        {"title": "Luxury Velvet Prayer Rug Set", "price": 45.00, "cat": "Lifestyle", "region": "MENA"},
        {"title": "Digital Tasbeeh Counter Ring", "price": 12.99, "cat": "Electronics", "region": "Global"},
        {"title": "Ramadan Kareem LED Lantern", "price": 24.50, "cat": "Home", "region": "MENA"},
        {"title": "Automatic Azan Clock", "price": 55.00, "cat": "Electronics", "region": "MENA"},
    ],
    "valentine": [
        {"title": "24K Gold Plated Rose", "price": 35.00, "cat": "Gifts", "region": "Global"},
        {"title": "Couples Magnetic Bracelets", "price": 18.90, "cat": "Jewelry", "region": "US"},
        {"title": "Custom Star Map Poster", "price": 29.00, "cat": "Art", "region": "EU"},
    ],
    "summer": [
        {"title": "Waterproof Phone Pouch", "price": 9.99, "cat": "Accessories", "region": "Global"},
        {"title": "Portable Neck Fan Pro", "price": 32.00, "cat": "Electronics", "region": "Asia"},
    ]
}

def translate_query(query: str) -> str:
    # 1. Translate / Expanding logic
    q = query.lower()
    if "ramazan" in q or "oruç" in q: return "ramadan"
    if "sevgililer" in q or "aşk" in q or "14 şubat" in q: return "valentine"
    if "yaz" in q or "tatil" in q: return "summer"
    return "random"

def scrape_products(keyword: str):
    print(f"🕵️‍♂️  Bot Starting... Mode: {keyword}")
    
    # 1. Translate
    target_key = translate_query(keyword)
    print(f"🌍  Concept Detected: {target_key.upper()}")

    # 2. Fetch Data (Simulation)
    source_products = MOCK_DATABASE.get(target_key, [])
    
    if not source_products:
        print("⚠️  No specific trend found, fetching mixed daily winners...")
        # Mix of random items
        source_products = MOCK_DATABASE["summer"] + MOCK_DATABASE["valentine"]
    
    products_to_insert = []
    
    for p in source_products:
        # Simulate Analysis
        saturation = random.randint(20, 80)
        daily_sales = random.randint(10, 500)
        
        # Build DB Object
        products_to_insert.append({
            "title_en": p["title"],
            "title_tr": f"{p['title']} (TR)", # Ideally use a Translator API here
            "price": p["price"],
            "image_url": f"https://source.unsplash.com/random/800x800/?{p['title'].replace(' ', ',')}",
            "category": p["cat"],
            "is_active": True
        })
        print(f"✅  Found Winner: {p['title']} (${p['price']}) - Region: {p['region']}")

    # 3. Push to Supabase
    if products_to_insert:
        print("🚀  Pushing to Database...")
        # Note: In real production we should check for duplicates first!
        data, count = supabase.table("products").insert(products_to_insert).execute()
        
        # Add Metrics (Optional, complex logic omitted for brevity)
        # We would loop through 'data' (inserted IDs) and add metrics
        
        print(f"🎉  Success! Added {len(products_to_insert)} new products.")
    else:
        print("❌  No products found.")

if __name__ == "__main__":
    import sys
    # Get argument from command line or default to 'random'
    query_arg = sys.argv[1] if len(sys.argv) > 1 else "random"
    scrape_products(query_arg)
