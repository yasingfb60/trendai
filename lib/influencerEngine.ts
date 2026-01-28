
import { Influencer } from "@/types";

// Niche definitions for smarter matching
const NICHES: Record<string, { platforms: string[], keywords: string[], costMultiplier: number }> = {
    'Electronics': {
        platforms: ['YouTube', 'Twitter', 'TikTok'],
        keywords: ['Tech', 'Review', 'Unboxing', 'Geek', 'Setup'],
        costMultiplier: 1.5 // Tech is expensive
    },
    'Fashion': {
        platforms: ['Instagram', 'TikTok', 'Pinterest'],
        keywords: ['Style', 'OOTD', 'Vogue', 'Chic', 'Trend'],
        costMultiplier: 1.2
    },
    'Home': {
        platforms: ['Instagram', 'Pinterest', 'TikTok'],
        keywords: ['Decor', 'Cozy', 'Interior', 'Living', 'DIY'],
        costMultiplier: 1.0
    },
    'Fitness': {
        platforms: ['Instagram', 'YouTube', 'TikTok'],
        keywords: ['Fit', 'Gym', 'Health', 'Workout', 'Body'],
        costMultiplier: 1.1
    },
    'Gaming': {
        platforms: ['Twitch', 'YouTube', 'Discord'],
        keywords: ['Gamer', 'Stream', 'Play', 'Ranked', 'GG'],
        costMultiplier: 0.9
    },
    'General': {
        platforms: ['TikTok', 'Instagram'],
        keywords: ['Life', 'Vlog', 'Daily', 'Fun'],
        costMultiplier: 1.0
    }
};

const MOCK_NAMES = {
    'Electronics': ["TechMarques", "GadgetFlow", "SiliconDave", "CircuitBreaker", "FutureLife", "UnboxTherapy_Fan"],
    'Fashion': ["SarahStyle", "VogueVibes", "ChicChloe", "TrendSetter_X", "UrbanFit", "ModaMilano"],
    'Fitness': ["GymRat_Pro", "FitWithJen", "IronLifter", "YogaFlow_Daily", "HealthyHabits", "RunRunner"],
    'Home': ["CozyCorner", "DecorDreams", "HomeHacks", "LivingSpace", "MinimalistHome"],
    'Gaming': ["ProGamer_Zed", "StreamKing", "PixelQueen", "RetroArcade", "LevelUp_Daily"]
};

export function generateInfluencers(category: string, productPrice: number): Influencer[] {
    // 1. Determine Niche Strategy
    // Default to 'General' if category not found, or map loosely
    let nicheKey = 'General';
    if (category.includes('Electro') || category.includes('Tech')) nicheKey = 'Electronics';
    else if (category.includes('Cloth') || category.includes('Fashion')) nicheKey = 'Fashion';
    else if (category.includes('Home') || category.includes('Kitchen')) nicheKey = 'Home';
    else if (category.includes('Sport') || category.includes('Fit')) nicheKey = 'Fitness';
    else if (category.includes('Game') || category.includes('Toy')) nicheKey = 'Gaming';

    const strategy = NICHES[nicheKey] || NICHES['General'];
    const names = MOCK_NAMES[nicheKey as keyof typeof MOCK_NAMES] || MOCK_NAMES['Fashion'];

    // 2. Generate 3 Profiles (High, Mid, Micro)
    const influencers: Influencer[] = [];

    // PROFILE 1: The "Mega Star" (High Reach, High Cost)
    influencers.push(createProfile(names[0], strategy, 'Mega', productPrice));

    // PROFILE 2: The "Niche Expert" (High Engagement, Mid Cost)
    influencers.push(createProfile(names[1], strategy, 'Macro', productPrice));

    // PROFILE 3: The "Micro Gem" (High ROI, Low Cost)
    influencers.push(createProfile(names[2], strategy, 'Micro', productPrice));

    return influencers;
}

function createProfile(baseName: string, strategy: any, tier: 'Mega' | 'Macro' | 'Micro', productPrice: number): Influencer {
    const platform = strategy.platforms[Math.floor(Math.random() * strategy.platforms.length)];

    let followers = 0;
    let engagementRate = 0;
    let matchScore = 0;

    if (tier === 'Mega') {
        followers = Math.floor(Math.random() * 2000000) + 500000; // 500k - 2.5M
        engagementRate = Number((Math.random() * 2 + 1.5).toFixed(1)); // 1.5% - 3.5%
        matchScore = Math.floor(Math.random() * 10) + 85; // 85-95
    } else if (tier === 'Macro') {
        followers = Math.floor(Math.random() * 400000) + 100000; // 100k - 500k
        engagementRate = Number((Math.random() * 3 + 2.5).toFixed(1)); // 2.5% - 5.5%
        matchScore = Math.floor(Math.random() * 10) + 90; // 90-100 (Best Fit)
    } else {
        followers = Math.floor(Math.random() * 80000) + 10000; // 10k - 90k
        engagementRate = Number((Math.random() * 5 + 4).toFixed(1)); // 4% - 9% (High engagement)
        matchScore = Math.floor(Math.random() * 15) + 75; // 75-90
    }

    // CPM (Cost Per Mille) Calculation
    // Base CPM $10-$30 depending on platform/niche
    const baseCPM = 15 * strategy.costMultiplier;
    // Engagement Bonus: +$5 CPM per 1% engagement
    const engBonus = engagementRate * 2;
    // Platform Adjuster
    const platformMultiplier = platform === 'YouTube' ? 2.5 : (platform === 'TikTok' ? 0.7 : 1.0); // YT expensive, TikTok cheap

    const finalCPM = (baseCPM + engBonus) * platformMultiplier;

    // Estimated Cost = (Followers / 1000) * CPM * (ViewRate ~20%)
    // Assuming 20% of followers see the post
    const estimatedViews = followers * 0.20;
    const estimatedCost = Math.floor((estimatedViews / 1000) * finalCPM);

    return {
        id: `inf-${Math.random().toString(36).substr(2, 9)}`,
        name: baseName,
        handle: `@${baseName.toLowerCase()}_${tier.toLowerCase()}`,
        platform: platform,
        followers: followers,
        engagementRate: engagementRate,
        matchScore: matchScore,
        estimatedCost: estimatedCost,
        estimatedViews: Math.floor(estimatedViews),
        niche: tier === 'Micro' ? `Rising ${strategy.keywords[0]} Star` : `Top ${strategy.keywords[0]} Authority`
    };
}
