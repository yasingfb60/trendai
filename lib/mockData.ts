import { Product } from "@/types";

// Helper to generate random sales history
const generateHistory = (base: number, variance: number) => {
    return Array.from({ length: 30 }, (_, i) => ({
        date: `2024-06-${i + 1}`,
        value: Math.floor(base + (Math.random() * variance) - (variance / 2)),
    }));
};

export const MOCK_PRODUCTS: Product[] = [
    {
        id: "1",
        title: "Portable Neck Fan - Bladeless 360°",
        description: "Hands-free cooling device perfect for summer, travel, and outdoor sports.",
        imageUrl: "https://images.unsplash.com/photo-1618360987399-j9s8a8a8a8a8?w=800&q=80",
        price: 29.99,
        currency: "USD",
        category: "Electronics",
        metrics: {
            dailySales: 134,
            monthlyRevenue: 120500,
            grossMargin: 65,
            roas: 4.2,
            activeAds: 18,
            saturationScore: 72,
            salesHistory: generateHistory(4000, 1000),
            adCountries: ["US", "CA", "GB"]
        },
        culturalFit: [],
        suppliers: [
            { id: "s1", name: "Shenzhen CoolTech", type: "Factory", location: "China", moq: 500, pricePerUnit: 4.50, rating: 4.8, leadTime: "10 Days", verified: true }
        ],
        influencers: []
    },
    // RAMAZAN SPECIALS
    {
        id: "2",
        title: "Premium Medjool Dates Gift Box",
        description: "Luxury organic dates, perfect for Iftar gatherings and gifts.",
        imageUrl: "https://images.unsplash.com/photo-1595411425732-e69c1ce3f64c?w=800&q=80",
        price: 45.00,
        currency: "USD",
        category: "Food & Beverage",
        metrics: {
            dailySales: 890,
            monthlyRevenue: 1200000,
            grossMargin: 55,
            roas: 6.5,
            activeAds: 45,
            saturationScore: 40,
            salesHistory: generateHistory(15000, 5000),
            adCountries: ["SA", "AE", "QA", "EG", "TR"]
        },
        culturalFit: [
            { countryCode: "TR", countryName: "Turkey", matchScore: 99, reasoning: "Essential for Ramazan traditions.", painPoints: [], sellingPoints: [] },
            { countryCode: "SA", countryName: "Saudi Arabia", matchScore: 99, reasoning: "High consumption during holy month.", painPoints: [], sellingPoints: [] }
        ],
        suppliers: [
            { id: "s2", name: "Al-Madina Dates Co", type: "Wholesaler", location: "Medina, SA", moq: 100, pricePerUnit: 12.00, rating: 4.9, leadTime: "5 Days", verified: true }
        ],
        influencers: []
    },
    {
        id: "3",
        title: "Smart Prayer Rug (Orthopedic)",
        description: "Memory foam prayer mat with posture support for elderly users.",
        imageUrl: "https://images.unsplash.com/photo-1583096114844-065dc69bc205?w=800&q=80",
        price: 89.99,
        currency: "USD",
        category: "Lifestyle",
        metrics: {
            dailySales: 210,
            monthlyRevenue: 560000,
            grossMargin: 70,
            roas: 5.1,
            activeAds: 12,
            saturationScore: 25,
            salesHistory: generateHistory(8000, 1200),
            adCountries: ["AE", "SA", "US", "GB"]
        },
        culturalFit: [
            { countryCode: "AE", countryName: "UAE", matchScore: 95, reasoning: "Tech-savvy population looking for comfort.", painPoints: [], sellingPoints: [] }
        ],
        suppliers: [
            { id: "s3", name: "Bursa Textile Group", type: "Factory", location: "Bursa, TR", moq: 50, pricePerUnit: 25.00, rating: 4.7, leadTime: "7 Days", verified: true }
        ],
        influencers: []
    },
    // VALENTINES SPECIALS
    {
        id: "4",
        title: "Galaxy Forever Rose Lamp",
        description: "Enchanted rose in glass dome with LED lights. Top gift for couples.",
        imageUrl: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&q=80",
        price: 34.99,
        currency: "USD",
        category: "Gifts",
        metrics: {
            dailySales: 1500,
            monthlyRevenue: 1500000,
            grossMargin: 80,
            roas: 8.2,
            activeAds: 120,
            saturationScore: 85,
            salesHistory: generateHistory(25000, 8000),
            adCountries: ["US", "CA", "GB", "AU", "FR", "DE"]
        },
        culturalFit: [
            { countryCode: "US", countryName: "USA", matchScore: 98, reasoning: "High volume during Feb 14.", painPoints: [], sellingPoints: [] },
            { countryCode: "TR", countryName: "Turkey", matchScore: 95, reasoning: "Popular romantic gesture.", painPoints: [], sellingPoints: [] }
        ],
        suppliers: [
            { id: "s4", name: "Yiwu Gifts Import", type: "Trading Company", location: "Yiwu, China", moq: 1000, pricePerUnit: 3.50, rating: 4.5, leadTime: "15 Days", verified: false }
        ],
        influencers: []
    },
    // K-POP / ASIA
    {
        id: "5",
        title: "K-Pop Light Stick Ver. 3",
        description: "Official concert light stick with bluetooth sync.",
        imageUrl: "https://images.unsplash.com/photo-1576435728678-38d01d52e38b?w=800&q=80",
        price: 59.99,
        currency: "USD",
        category: "Entertainment",
        metrics: {
            dailySales: 400,
            monthlyRevenue: 720000,
            grossMargin: 50,
            roas: 3.0,
            activeAds: 5,
            saturationScore: 60,
            salesHistory: generateHistory(6000, 500),
            adCountries: ["KR", "JP", "TH", "PH"]
        },
        culturalFit: [
            { countryCode: "KR", countryName: "South Korea", matchScore: 100, reasoning: "Essential fan culture item.", painPoints: [], sellingPoints: [] },
            { countryCode: "JP", countryName: "Japan", matchScore: 95, reasoning: "Huge fanbase market.", painPoints: [], sellingPoints: [] }
        ],
        suppliers: [
            { id: "s5", name: "Seoul Merch Co", type: "Distributor", location: "Seoul, KR", moq: 200, pricePerUnit: 28.00, rating: 4.9, leadTime: "3 Days", verified: true }
        ],
        influencers: []
    }
];

export const REGIONS = [
    { id: "ALL", label: "Global", emoji: "🌍" },
    { id: "MENA", label: "MENA (Middle East)", emoji: "☪️" },
    { id: "EU", label: "Europe", emoji: "🇪🇺" },
    { id: "US", label: "North America", emoji: "🇺🇸" },
    { id: "ASIA", label: "Asia (JP/KR)", emoji: "⛩️" },
];

// Helper to filter products
export function searchProducts(query: string, region: string, lang: 'en' | 'tr') {
    const q = query.toLowerCase();

    // Keyword mappings (Simple NLP simulation)
    const keywords: Record<string, string[]> = {
        "ramazan": ["dates", "prayer", "islamic", "rug"],
        "ramadan": ["dates", "prayer", "islamic", "rug"],
        "iftar": ["dates", "food"],
        "sevgililer": ["rose", "lamp", "gift", "love", "couple"],
        "valentine": ["rose", "lamp", "gift", "love", "couple"],
        "ask": ["rose", "lamp", "gift"],
        "kpop": ["light", "stick", "korea"],
        "music": ["light", "stick"],
    };

    // Check if query matches a special event keyword
    let targetTags: string[] = [];
    Object.keys(keywords).forEach(key => {
        if (q.includes(key)) {
            targetTags = [...targetTags, ...keywords[key]];
        }
    });

    return MOCK_PRODUCTS.filter(p => {
        // 1. Text Filter
        const titleMatch = p.title.toLowerCase().includes(q);
        const descriptionMatch = p.description.toLowerCase().includes(q); // fixed naming
        // If we found special tags (e.g. ramazan), check if product text contains the mapped keywords (e.g. dates)
        const tagMatch = targetTags.length > 0 && targetTags.some(t => p.title.toLowerCase().includes(t) || p.description.toLowerCase().includes(t));

        const isTextMatch = titleMatch || descriptionMatch || tagMatch || q === "";

        // 2. Region Filter (Simulated based on cultural fit existence)
        let isRegionMatch = true;
        if (region === "MENA") {
            isRegionMatch = p.culturalFit.some(c => ["TR", "SA", "AE", "QA", "EG"].includes(c.countryCode));
        } else if (region === "EU") {
            isRegionMatch = p.culturalFit.some(c => ["GB", "DE", "FR", "IT", "ES"].includes(c.countryCode));
        } else if (region === "US") {
            isRegionMatch = p.culturalFit.some(c => ["US", "CA"].includes(c.countryCode));
        } else if (region === "ASIA") {
            isRegionMatch = p.culturalFit.some(c => ["JP", "KR", "CN"].includes(c.countryCode));
        }

        return isTextMatch && isRegionMatch;
    });
}
