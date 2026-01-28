import asyncio
import aiohttp
import os
import random
from supabase import create_client, Client
from dotenv import load_dotenv

# Load secrets
# Try loading from current directory (root) first, then parent
if os.path.exists(".env.local"):
    load_dotenv(dotenv_path=".env.local")
else:
    load_dotenv(dotenv_path="../.env.local")

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not url or not key:
    print(f"❌ Error: Missing credentials. Looking in {os.getcwd()}")
    exit(1)

supabase: Client = create_client(url, key)

# --- 2. INTELLIGENCE MODULE (The "Brain") ---
async def analyze_product_fit(product, target_countries=["TR", "US", "DE"]):
    """
    Analyzes if a found product is a good 'Arbitrage' candidate for our target markets.
    """
    # Simulation: Randomly assign a 'Fit Score' and 'Target Country'
    # In reality, this would use OpenAI to compare product description vs Cultural Trends.
    score = random.randint(50, 99)
    best_market = random.choice(target_countries)
    
    is_arbitrage_opportunity = False
    
    # Logic: Relaxed constraints for DEMO
    if product['price'] < 200 and score > 40:
        is_arbitrage_opportunity = True
        
    return {
        "score": score,
        "target_market": best_market,
        "is_opportunity": is_arbitrage_opportunity,
        "reason": f"High demand detected in {best_market} for {product['category']}"
    }

async def discover_new_stores(session):
    """
    Simulates a 'Mass Crawler' that finds Niche Shopify stores via keywords.
    Keywords: 'gadget', 'trend', 'viral', 'beauty', 'pet'
    """
    print("🛰️  Satellite Scan Initiated: Searching for viral stores...")
    
    # Dynamic "Found" stores simulation
    niche_keywords = ['gadget', 'home', 'beauty', 'tech', 'pet']
    new_store_name = f"Shopify-{random.choice(niche_keywords)}-{random.randint(1000,9999)}"
    
    new_store = {
        "url": f"https://{new_store_name.lower()}.com",
        "name": new_store_name,
        "status": "active"
    }
    
    # Save to DB so we monitor it from now on
    try:
        data = supabase.table("monitored_stores").upsert(new_store, on_conflict="url").execute()
        if data.data:
            print(f"🔭  New Star Discovered: {new_store['name']}")
            return data.data[0] # Return the DB object with ID
    except Exception as e:
        print(f"Error saving store: {e}")
        return None

async def fetch_store_products(session, store):
    """
    Fetches products from a single store.
    """
    store_url = store['url'].rstrip('/')
    api_url = f"{store_url}/products.json?limit=5" # Get top 5 newest
    
    try:
        # TIMEOUT is crucial for mass scanning
        async with session.get(api_url, timeout=5) as response:
            if response.status == 200:
                data = await response.json()
                return store['id'], store['name'], data.get('products', [])
            return store['id'], store['name'], []
    except:
        return store['id'], store['name'], []

async def main():
    print("🕵️‍♂️  GLOBAL PRODUCT HUNTER [MASS DISCOVERY MODE] ACTIVATED")
    print("=========================================================")
    print("🎯  Mission: Find high-arbitrage products for [TR, US, MENA]")
    
    target_markets = ["TR", "US", "DE", "SA"]
    
    async with aiohttp.ClientSession() as session:
        # 1. CONTINUOUS DISCOVERY LOOP
        # In a real script, this would run infinitely. Here we do one "Batch".
        
        # Step A: Find 5 new stores from the "Unknown"
        new_stores = []
        for _ in range(5):
            store = await discover_new_stores(session)
            if store: new_stores.append(store)
            
        # Step B: Scan these new stores + existing ones
        # Get existing top stores
        response = supabase.table("monitored_stores").select("*").eq("status", "active").limit(10).execute()
        all_targets = response.data + new_stores
        
        print(f"\n📡  Scanning {len(all_targets)} active targets for signals...")
        
        tasks = [fetch_store_products(session, store) for store in all_targets]
        results = await asyncio.gather(*tasks)
        
        # 2. ANALYZE & FILTER
        total_analyzed = 0
        opportunities_found = 0
        
        for store_id, store_name, products in results:
            if not products: continue
            
            for p in products:
                total_analyzed += 1
                
                # Extract basic data
                variant = p['variants'][0] if p['variants'] else {}
                price = float(variant.get('price', 0))
                image = p['images'][0]['src'] if p['images'] else None
                category = p.get('product_type', 'General')
                
                product_data = {
                    "price": price,
                    "category": category,
                    "title": p['title']
                }
                
                # THE BRAIN: Analyze Fit
                analysis = await analyze_product_fit(product_data, target_markets)
                
                if analysis['is_opportunity']:
                    opportunities_found += 1
                    print(f"🚨  OPPORTUNITY DETECTED: {p['title']}")
                    print(f"    -> Buy at ${price} | Sell in {analysis['target_market']} (Score: {analysis['score']})")
                    
                    # Save to DB
                    item = {
                        "store_id": store_id,
                        "external_id": str(p['id']),
                        "title": p['title'],
                        "handle": p['handle'],
                        "price": price,
                        "image_url": image,
                        "published_at": p['published_at'],
                        "is_hot": True, # Flag as hot opportunity
                        # In real app, we'd add 'analysis_json' field to store the logic
                    }
                    supabase.table("competitor_products").upsert(item, on_conflict="store_id,external_id").execute()
        
        print("\n=========================================================")
        print(f"📊  SCAN REPORT:")
        print(f"    - Stores Scanned: {len(all_targets)}")
        print(f"    - Products Analyzed: {total_analyzed}")
        print(f"    - 💎 GEMS FOUND: {opportunities_found}")
        print("=========================================================")

if __name__ == "__main__":
    asyncio.run(main())
