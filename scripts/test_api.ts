
import { getRawProducts, getCompetitorProducts, getProducts } from "../lib/api";

async function main() {
    console.log("--- TESTING RAW PRODUCTS ---");
    try {
        const raw = await getRawProducts();
        console.log(`Success: Fetched ${raw.length} raw products`);
    } catch (e) {
        console.error("FAILED RAW PRODUCTS:", e);
    }

    console.log("\n--- TESTING COMPETITOR PRODUCTS ---");
    try {
        const comp = await getCompetitorProducts();
        console.log(`Success: Fetched ${comp.length} competitor products`);
    } catch (e) {
        console.error("FAILED COMPETITOR PRODUCTS:", e);
    }

    console.log("\n--- TESTING MAPPED PRODUCTS (Main Page Logic) ---");
    try {
        const products = await getProducts('en');
        console.log(`Success: Fetched and mapped ${products.length} products`);
        if (products.length > 0) {
            console.log("Sample mapped product:", JSON.stringify(products[0], null, 2));
        }
    } catch (e) {
        console.error("FAILED MAPPED PRODUCTS:", e);
    }
}

main();
