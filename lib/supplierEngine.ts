
import { Supplier } from "@/types";

// Global Sourcing Hubs logic
const HUBS: Record<string, { locations: string[], types: string[] }> = {
    'Electronics': {
        locations: ['Shenzhen, China', 'Guangzhou, China', 'Seoul, South Korea', 'Taipei, Taiwan'],
        types: ['Factory', 'OEM Manufacturer', 'Electronics Group']
    },
    'Fashion': {
        locations: ['Istanbul, Turkey', 'Ho Chi Minh, Vietnam', 'Dhaka, Bangladesh', 'Ningbo, China'],
        types: ['Textile Factory', 'Apparel Manufacturer', 'Fashion House']
    },
    'Home': {
        locations: ['Yiwu, China', 'New Delhi, India', 'Istanbul, Turkey', 'Dongguan, China'],
        types: ['Factory', 'Trading Company', 'Craft Workshop']
    },
    'Beauty': {
        locations: ['Seoul, South Korea', 'Guangzhou, China', 'Paris, France', 'Los Angeles, USA'],
        types: ['Lab', 'Cosmetics Factory', 'Brand Supplier']
    },
    'General': {
        locations: ['Yiwu, China', 'Guangdong, China', 'Mumbai, India'],
        types: ['Wholesaler', 'Trading Company', 'Global Distributor']
    }
};

const NAMES = {
    'Electronics': ["Shenzhen Tech", "Foxconn Mini", "Guangzhou Electronics", "Future Gadgets OEM", "SmartLife Manufacturing"],
    'Fashion': ["Istanbul Textiles", "Vietnam Garment Co", "SilkRoad Fabrics", "Ningbo Fashion Group", "EcoWear Factory"],
    'Home': ["Yiwu Home Goods", "Global Deco", "SmartLiving Factory", "PureCraft India"],
    'General': ["Global Sourcing Ltd", "East-West Trading", "Rapid Supply Co", "Mega Wholesalers"]
};

export function generateSuppliers(category: string, productPrice: number): Supplier[] {
    // 1. Determine Hub Strategy
    let nicheKey = 'General';
    if (category.includes('Electro') || category.includes('Tech') || category.includes('Game')) nicheKey = 'Electronics';
    else if (category.includes('Cloth') || category.includes('Fashion')) nicheKey = 'Fashion';
    else if (category.includes('Home') || category.includes('Kitchen')) nicheKey = 'Home';
    else if (category.includes('Beauty') || category.includes('Skin')) nicheKey = 'Beauty';

    const hub = HUBS[nicheKey] || HUBS['General'];
    const names = NAMES[nicheKey as keyof typeof NAMES] || NAMES['General'];

    const suppliers: Supplier[] = [];

    // Create 3 varied suppliers:
    // 1. The Direct Factory (Low Price, High MOQ)
    suppliers.push(createSupplier(names, hub, 'Factory', productPrice));

    // 2. The Trading Company (Mid Price, Low MOQ)
    suppliers.push(createSupplier(names, hub, 'Trading', productPrice));

    // 3. The Verified Premium Partner (Higher Price, Fast Ship, Low MOQ)
    suppliers.push(createSupplier(names, hub, 'Premium', productPrice));

    return suppliers;
}

function createSupplier(names: string[], hub: any, tier: 'Factory' | 'Trading' | 'Premium', retailPrice: number): Supplier {
    const nameBase = names[Math.floor(Math.random() * names.length)];
    const location = hub.locations[Math.floor(Math.random() * hub.locations.length)];

    let priceMultiplier = 0;
    let moq = 0;
    let leadTime = "";
    let type = "Factory";
    let suffix = "";
    let rating = 0;

    if (tier === 'Factory') {
        priceMultiplier = 0.25; // Super cheap (25% of retail)
        moq = 500; // High MOQ
        leadTime = "25-30 days";
        type = "OEM Factory";
        suffix = " Industrial";
        rating = 4.2;
    } else if (tier === 'Trading') {
        priceMultiplier = 0.35; // Cheap (35% of retail)
        moq = 50; // Low MOQ
        leadTime = "10-15 days";
        type = "Trading Company";
        suffix = " Import/Export";
        rating = 4.5;
    } else {
        priceMultiplier = 0.45; // Bit pricey (45% of retail)
        moq = 1; // Dropshipping ready
        leadTime = "3-7 days";
        type = "Gold Supplier";
        suffix = " Global";
        rating = 4.9;
    }

    return {
        id: `sup-${Math.random().toString(36).substr(2, 9)}`,
        name: `${nameBase}${suffix}`,
        type: type as any,
        location: location,
        moq: moq,
        pricePerUnit: Number((retailPrice * priceMultiplier).toFixed(2)),
        leadTime: leadTime,
        rating: rating,
        verified: tier !== 'Trading' // Trading companies maybe less verified in this mock
    };
}
