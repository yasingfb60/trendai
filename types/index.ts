export interface Product {
    id: string;
    handle?: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    currency: string;
    category: string;
    metrics: ProductMetrics;
    culturalFit: CulturalFitReport[];
    suppliers: Supplier[];
    influencers: Influencer[];
}

export interface ProductMetrics {
    dailySales: number;
    monthlyRevenue: number;
    grossMargin: number; // percentage
    roas: number;
    activeAds: number;
    saturationScore: number; // 0-100
    salesHistory: { date: string; value: number }[];
    adCountries: string[]; // List of country codes where ads are active
}

export interface Supplier {
    id: string;
    name: string;
    type: "Factory" | "Wholesaler" | "Trading Company" | "Distributor";
    location: string;
    moq: number;
    pricePerUnit: number;
    rating: number; // 1-5
    leadTime: string; // e.g., "15-20 days"
    verified: boolean;
}

export interface Influencer {
    id: string;
    name: string;
    handle: string;
    matchScore: number;
    platform: "Instagram" | "TikTok" | "YouTube" | "Twitter";
    followers: number;
    engagementRate: number; // percentage
    niche: string;
    estimatedCost: number; // per post
    estimatedViews: number; // predicted reach
}

export interface CulturalFitReport {
    countryCode: string; // e.g., "US", "DE", "TR"
    countryName: string;
    matchScore: number; // 0-100
    reasoning: string;
    painPoints: string[];
    sellingPoints: string[];
}
