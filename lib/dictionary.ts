export type Locale = 'en' | 'tr';

export const dictionary = {
    en: {
        sidebar: {
            dashboard: "Dashboard",
            trendScout: "Trend Scout",
            arbitrage: "Arbitrage",
            suppliers: "Suppliers",
            influencers: "Influencers",
            settings: "Settings",
            logout: "Logout",
        },
        header: {
            searchPlaceholder: "Search products, trends, or countries...",
            proPlan: "Pro Plan",
        },
        dashboard: {
            title: "Dashboard",
            totalRevenue: "Total Revenue",
            activeProducts: "Active Products",
            trendingNow: "Trending Now",
            openArbitrage: "Open Arbitrage",
            heatmapTitle: "Global Market Heatmap",
            recentOpp: "Recent Opportunities",
            recentOppDesc: "New products matching your criteria.",
            month: "from last month",
            verified: "new products verified",
            viral: "Viral potential detected",
            gap: "High margin gaps found",
            match: "Match",
            highDemand: "High demand in",
        },
        product: {
            back: "Back to Dashboard",
            share: "Share Report",
            track: "Track Product",
            viewAmazon: "View on Amazon",
            sellingPrice: "Selling Price",
            sourcingCost: "Sourcing Cost",
            profitUnit: "Profit/Unit",
            metrics: {
                monthlyRev: "Monthly Revenue",
                grossMargin: "Gross Margin",
                roas: "ROAS",
                saturation: "Saturation",
                activeAds: "Active Ads",
                salesTrend: "Sales Trend (30 Days)",
                highProf: "High profitability",
                medComp: "Medium competition",
            },
            cultural: {
                title: "Cultural Intelligence",
                match: "Match",
                whySells: "Why it sells",
                watchOut: "Watch Out For",
            },
            supplier: {
                title: "Verified Suppliers",
                moq: "MOQ",
                priceUnit: "Price/Unit",
                leadTime: "Lead Time",
                connect: "Connect",
            },
            influencer: {
                title: "Influencer Match",
                followers: "Followers",
                engRate: "Eng. Rate",
                estCost: "Est. Cost",
                post: "/ post",
                viewProfile: "View Profile",
                roiTitle: "ROI Simulation",
                viralBadge: "Potential Viral",
                spend: "Spend",
                getViews: "Get Views",
                tips: {
                    tiktok: "Best for viral reach & impulse buys.",
                    instagram: "Best for aesthetic & brand awareness.",
                    youtube: "Best for detailed reviews & trust.",
                    twitter: "Best for tech discussions.",
                }
            },
            mock: {
                title: "Portable Neck Fan - Bladeless 360°",
                desc: "Hands-free cooling device perfect for summer, travel, and outdoor sports. 4000mAh battery providing 4-16 hours duration.",
                saReason: "Extreme heat throughout the year makes personal cooling devices essential luxury items.",
                jpReason: "High commuter population using public transit during humid summers.",
                ukReason: "Short summer season limits usage window.",
            },
            calculator: {
                title: "Profit Calculator",
                cost: "Product Cost",
                shipping: "Shipping",
                adCost: "Ad Cost (CPC)",
                price: "Selling Price",
                net: "Net Profit",
                margin: "Margin",
                calculate: "Calculate"
            },
            keywords: {
                title: "Keyword Intelligence",
                volume: "Volume",
                competition: "Comp.",
                cpc: "CPC"
            },
            ads: {
                title: "Meta Ad Intelligence",
                activeIn: "Active Countries",
                opportunity: "Opportunity Alert",
                blueOcean: "BLUE OCEAN: Zero active ads found in these target regions:",
                recommendation: "Great time to enter this market with zero competition!"
            },
            daily: {
                title: "Daily Drops",
                subtitle: "AI found 3 winning products today.",
                refresh: "Refreshes in:",
                view: "View"
            },
            tabs: {
                analysis: "Market Analysis",
                operations: "Operations & Supply",
                marketing: "Marketing & Virality"
            },
            competitor: {
                title: "Deep Competitor Intelligence",
                desc: "Real-time market analysis and price tracking.",
                chartTitle: "6-Month Price Trend",
                you: "You",
                marketAvg: "Market Avg",
                comparison: "Market Comparison",
                table: {
                    vendor: "Vendor",
                    price: "Price",
                    rating: "Rating",
                    shipping: "Shipping",
                    stock: "Stock"
                },
                goodPrice: "Competitive Price",
                badPrice: "Overpriced",
                adTracker: {
                    title: "Live Competitor Ads",
                    subtitle: "See what ads your competitors are running right now.",
                    activeDays: "Active Days",
                    copyScore: "Copy Score",
                    cta: "Shop Now"
                },
                metaAds: {
                    tab: "Meta Ad Library",
                    activeAds: "Running Now",
                    totalHistory: "Total Ad History",
                    videoContent: "Format Preference",
                    impressions: "Est. Total Views",
                    libraryTitle: "Ad Library",
                    live: "Live",
                    filter: "Filter",
                    viewMeta: "View on Meta Library",
                    preview: "Preview",
                    download: "Download",
                    copyText: "Copy Text",
                    days: "Days",
                    activeDesc: "Ads currently active",
                    historyDesc: "Lifetime ads launched",
                    reachDesc: "Est. reach last 30 days",
                    video: "Video",
                    image: "Image"
                },
                video: {
                    title: "AI Video Creator",
                    desc: "Turn product images into viral Reels/TikToks instantly.",
                    selectVibe: "Select Vibe",
                    soundtrack: "Soundtrack",
                    generate: "Generate Video",
                    rendering: "Rendering Video",
                    preview: "Video Preview",
                    save: "Save",
                    post: "Post",
                    clickToPreview: "Click 'Generate' to Create Preview"
                }
            },

        },
        trends: {
            title: "VIRAL ALARM_",
            subtitle: "AI-detected rising stars before they hit global saturation.",
            filterBtn: "Filter High Opportunity",
            todaySignal: "Today's Signals",
            products: "Products",
            match: "% MATCH"
        },
        arbitrage: {
            title: "Global Arbitrage Opportunities",
            subtitle: "Real-time price & demand gaps across markets.",
            table: {
                product: "Product",
                buyIn: "Buy In (Source)",
                sellIn: "Sell In (Target)",
                margin: "Margin",
                demand: "Demand",
                action: "Action"
            },
            filter: "Filter Opportunities"
        },
        kbridge: {
            title: "K-Bridge Intelligence",
            subtitle: "Korea to Turkey: 0% Tax Arbitrage Scanner.",
            steps: {
                scan: "Scanning Seoul Trends...",
                supplier: "Finding Best KR Supplier...",
                saturation: "Checking TR Market Saturation...",
                calc: "Calculating Landed Cost..."
            },
            cards: {
                source: "Best Korean Source",
                landed: "Landed Cost (TR)",
                margin: "Net Profit Margin",
                competition: "TR Competition"
            },
            status: {
                viral: "VIRAL IN KOREA",
                blueOcean: "BLUE OCEAN IN TURKEY",
                saturated: "SATURATED"
            },
            ui: {
                startScan: "Start Deep Scan",
                scanning: "Scanning...",
                viewAnalysis: "View Analysis",
                supplierInfo: "Supplier Info",
                foundSupplier: "Found Best Supplier:",
                koreaCost: "Korea Cost",
                trSelling: "TR Selling",
                moq: "MOQ:",
                estProfit: "Est. Profit:",
                marketSat: "TR Market Saturation",
                blueOceanBadge: "💎 BLUE OCEAN",
                noCompetitors: "No Competitors Found!",
                blueOceanDesc: "This is a Blue Ocean opportunity.",
                detected: "Detected:",
                liveData: "Live data extracted from competitor analysis.",
                details: "Saturation Details"
            },
            scanMessages: {
                step1: "Accessing Olive Young API... Parsing Viral Trends...",
                step2: "Connecting to 1688 & Coupang Wholesalers...",
                step3: "Scanning Trendyol, Shopify & Meta Library...",
                step4: "Scanning 124 Shopify Stores & 14 Meta Ad Accounts..."
            },
            time: {
                ago: "ago",
                hour: "h",
                day: "d",
                live: "Live"
            },
            supplierTypes: {
                distributor: "Brand Distributor"
            }
        },
        common: {
            liveMarkets: "LIVE MARKETS",
            noProducts: "No products found",
            searching: "Searching for",
            global: "Global",
            chinaEst: "China (Est.)",
            viral: "Viral",
            new: "New"
        },
        influencerDirectory: {
            title: "Influencer Matchmaker",
            subtitle: "Find the perfect voice for your brand.",
            columns: {
                influencer: "Influencer",
                niche: "Niche",
                platform: "Platform",
                roi: "Est. ROI (CPM)",
                action: "Action"
            },
            filters: {
                all: "All Niches",
                tech: "Tech",
                beauty: "Beauty",
                home: "Home",
                fitness: "Fitness",
                gaming: "Gaming"
            }
        },
        productCard: {
            interest: "Interest",
            margin: "Margin",
            day: "/day",
            lowSat: "Low Saturation",
            rising: "Rising",
            view: "View"
        }
    },
    tr: {
        sidebar: {
            dashboard: "Panel",
            trendScout: "Trend Avcısı",
            arbitrage: "Arbitraj",
            suppliers: "Tedarikçiler",
            influencers: "Influencerlar",
            settings: "Ayarlar",
            logout: "Çıkış Yap",
        },
        header: {
            searchPlaceholder: "Ürün, trend veya ülke ara...",
            proPlan: "Pro Plan",
        },
        dashboard: {
            title: "Kontrol Paneli",
            totalRevenue: "Toplam Gelir",
            activeProducts: "Aktif Ürünler",
            trendingNow: "Trend Olanlar",
            openArbitrage: "Açık Arbitraj",
            heatmapTitle: "Küresel Pazar Isı Haritası",
            recentOpp: "Son Fırsatlar",
            recentOppDesc: "Kriterlerinize uyan yeni ürünler.",
            month: "geçen aya göre",
            verified: "yeni ürün doğrulandı",
            viral: "Viral potansiyel tespit edildi",
            gap: "Yüksek marj boşlukları",
            match: "Eşleşme",
            highDemand: "Yüksek talep:",
        },
        product: {
            back: "Panele Dön",
            share: "Raporu Paylaş",
            track: "Ürünü Takip Et",
            viewAmazon: "Amazon'da Gör",
            sellingPrice: "Satış Fiyatı",
            sourcingCost: "Maliyet",
            profitUnit: "Kar/Birim",
            metrics: {
                monthlyRev: "Aylık Ciro",
                grossMargin: "Brüt Kar Marjı",
                roas: "ROAS (Reklam Getirisi)",
                saturation: "Doygunluk",
                activeAds: "Aktif Reklam",
                salesTrend: "Satış Trendi (30 Gün)",
                highProf: "Yüksek karlılık",
                medComp: "Orta seviye rekabet",
            },
            cultural: {
                title: "Kültürel Zeka",
                match: "Uyum",
                whySells: "Neden Satar?",
                watchOut: "Dikkat Et",
            },
            supplier: {
                title: "Doğrulanmış Tedarikçiler",
                moq: "Min. Sipariş (MOQ)",
                priceUnit: "Birim Fiyat",
                leadTime: "Teslim Süresi",
                connect: "İletişime Geç",
            },
            influencer: {
                title: "Influencer Eşleşmesi",
                followers: "Takipçi",
                engRate: "Etkileşim",
                estCost: "Tahmini Ücret",
                post: "/ gönderi",
                viewProfile: "Profili Gör",
                roiTitle: "Yatırım Simülasyonu",
                viralBadge: "Viral Potansiyel",
                spend: "Harcama",
                getViews: "Kazanım",
                tips: {
                    tiktok: "Viral erişim ve hızlı satış için en iyisi.",
                    instagram: "Estetik ve marka bilinirliği için en iyisi.",
                    youtube: "Detaylı inceleme ve güven için en iyisi.",
                    twitter: "Teknoloji tartışmaları için en iyisi.",
                }
            },
            mock: {
                title: "Taşınabilir Boyun Fanı - Pervanesiz 360°",
                desc: "Yaz ayları, seyahat ve açık hava sporları için mükemmel eller serbest soğutma cihazı. 4-16 saat kullanım sağlayan 4000mAh batarya.",
                saReason: "Yıl boyunca süren aşırı sıcaklar, kişisel soğutma cihazlarını temel bir ihtiyaç haline getiriyor.",
                jpReason: "Nemli yaz aylarında toplu taşıma kullanan yoğun çalışan nüfus.",
                ukReason: "Kısa yaz sezonu kullanım penceresini kısıtlıyor.",
            },
            calculator: {
                title: "Kar Hesaplayıcı",
                cost: "Ürün Maliyeti",
                shipping: "Kargo Ücreti",
                adCost: "Reklam (TBM)",
                price: "Satış Fiyatı",
                net: "Net Kar",
                margin: "Kar Marjı",
                calculate: "Hesapla"
            },
            keywords: {
                title: "Anahtar Kelime Zekası",
                volume: "Hacim",
                competition: "Rekabet",
                cpc: "TBM"
            },
            ads: {
                title: "Meta Reklam İstihbaratı",
                activeIn: "Aktif Olduğu Ülkeler",
                opportunity: "Fırsat Alarmı",
                blueOcean: "MAVİ OKYANUS: Bu ürünün şu ülkelerde henüz HİÇ REKLAMI YOK:",
                recommendation: "Rekabet olmadan bu pazara girmek için harika bir zaman!"
            },
            daily: {
                title: "Günün Fırsatları",
                subtitle: "Yapay zeka bugün 3 yeni kazanan ürün buldu.",
                refresh: "Yenilenme:",
                view: "İncele"
            },
            tabs: {
                analysis: "Pazar Analizi",
                operations: "Operasyon & Tedarik",
                marketing: "Pazarlama & Viral"
            },
            competitor: {
                title: "Derin Rakip Analizi",
                desc: "Gerçek zamanlı piyasa analizi ve fiyat takibi.",
                chartTitle: "6 Aylık Fiyat Trendi",
                you: "Sen",
                marketAvg: "Piyasa Ort.",
                comparison: "Piyasa Karşılaştırması",
                table: {
                    vendor: "Satıcı",
                    price: "Fiyat",
                    rating: "Puan",
                    shipping: "Kargo",
                    stock: "Stok"
                },
                goodPrice: "Rekabetçi Fiyat",
                badPrice: "Pahalı",
                adTracker: {
                    title: "Canlı Rakip Reklamları",
                    subtitle: "Rakiplerinizin şu an yayınladığı reklamları izleyin.",
                    activeDays: "Aktif Gün",
                    copyScore: "Metin Puanı",
                    cta: "Şimdi Al"
                },
                metaAds: {
                    tab: "Meta Reklam Kütüphanesi",
                    activeAds: "Şu An Yayında",
                    totalHistory: "Toplam Reklam Geçmişi",
                    videoContent: "Format Tercihi",
                    impressions: "Tahmini Görüntülenme",
                    libraryTitle: "Reklam Kütüphanesi",
                    live: "Canlı",
                    filter: "Filtrele",
                    viewMeta: "Meta Kütüphanesinde Aç",
                    preview: "Önizle",
                    download: "İndir",
                    copyText: "Metni Kopyala",
                    days: "Gün",
                    activeDesc: "Şu anda aktif olan",
                    historyDesc: "Toplam oluşturulan",
                    reachDesc: "Son 30 gün tahmini",
                    video: "Video",
                    image: "Görsel"
                },
                video: {
                    title: "Yapay Zeka Video Oluşturucu",
                    desc: "Ürün görsellerini saniyeler içinde viral Reels/TikTok videolarına dönüştürün.",
                    selectVibe: "Tarz Seçin",
                    soundtrack: "Müzik",
                    generate: "Video Oluştur",
                    rendering: "Video Hazırlanıyor",
                    preview: "Video Önizleme",
                    save: "Kaydet",
                    post: "Paylaş",
                    clickToPreview: "Önizleme Oluşturmak İçin Tıklayın"
                }
            },

        },
        trends: {
            title: "VİRAL ALARMI_",
            subtitle: "Yapay zeka tarafından tespit edilen, küresel doygunluğa ulaşmamış yükselen yıldızlar.",
            filterBtn: "Fırsatları Filtrele",
            todaySignal: "Bugünün Sinyalleri",
            products: "Ürün",
            match: "% EŞLEŞME"
        },
        arbitrage: {
            title: "Küresel Arbitraj Fırsatları",
            subtitle: "Pazarlar arası anlık fiyat ve talep boşlukları.",
            table: {
                product: "Ürün",
                buyIn: "Alım Yeri (Kaynak)",
                sellIn: "Satış Yeri (Hedef)",
                margin: "Marj",
                demand: "Talep",
                action: "İşlem"
            },
            filter: "Fırsatları Filtrele"
        },
        kbridge: {
            title: "K-Bridge İstihbaratı",
            subtitle: "Kore'den Türkiye'ye: %0 Gümrük Avantajı Tarayıcısı.",
            steps: {
                scan: "Seul Trendleri Taranıyor...",
                supplier: "En İyi Koreli Tedarikçi Bulunuyor...",
                saturation: "TR Pazar Doygunluğu Kontrol Ediliyor...",
                calc: "Gümrük & Maliyet Hesaplanıyor..."
            },
            cards: {
                source: "En İyi Kore Kaynağı",
                landed: "TR'ye Giriş Maliyeti",
                margin: "Net Kar Marjı",
                competition: "TR Rekabeti"
            },
            status: {
                viral: "VIRAL IN KOREA",
                blueOcean: "BLUE OCEAN IN TURKEY",
                saturated: "SATURATED"
            },
            ui: {
                startScan: "Derin Taramayı Başlat",
                scanning: "Taranıyor...",
                viewAnalysis: "Analizi İncele",
                supplierInfo: "Tedarikçi Bilgisi",
                foundSupplier: "En İyi Tedarikçi:",
                koreaCost: "Kore Maliyeti",
                trSelling: "TR Satış Fiyatı",
                moq: "Min. Sipariş:",
                estProfit: "Tahmini Kar:",
                marketSat: "TR Pazar Doygunluğu",
                blueOceanBadge: "💎 MAVİ OKYANUS",
                noCompetitors: "Rakip Bulunamadı!",
                blueOceanDesc: "Bu tam bir Mavi Okyanus fırsatı.",
                detected: "Tespit:",
                liveData: "Rakip analizinden alınan canlı veriler.",
                details: "Doygunluk Detayları"
            },
            scanMessages: {
                step1: "Olive Young API Bağlanıyor... Viral Trendler İşleniyor...",
                step2: "1688 & Coupang Toptancılarına Bağlanılıyor...",
                step3: "Trendyol, Shopify & Meta Kütüphanesi Taranıyor...",
                step4: "124 Shopify Mağazası & 14 Meta Reklam Hesabı Taranıyor..."
            },
            time: {
                ago: "önce",
                hour: "s",
                day: "g",
                live: "Canlı"
            },
            supplierTypes: {
                distributor: "Marka Distribütörü"
            }
        },
        common: {
            liveMarkets: "CANLI PAZARLAR",
            noProducts: "Ürün bulunamadı",
            searching: "Aranan:",
            global: "Küresel",
            chinaEst: "Çin (Tahmini)",
            viral: "Viral",
            new: "Yeni"
        },
        influencerDirectory: {
            title: "Influencer Eşleşme Merkezi",
            subtitle: "Markanız için en doğru sesi bulun.",
            columns: {
                influencer: "Influencer",
                niche: "Niş",
                platform: "Platform",
                roi: "Tahmini Getiri (CPM)",
                action: "İşlem"
            },
            filters: {
                all: "Tümü",
                tech: "Teknoloji",
                beauty: "Güzellik",
                home: "Ev & Yaşam",
                fitness: "Spor",
                gaming: "Oyun"
            }
        },
        productCard: {
            interest: "İlgi",
            margin: "Marj",
            day: "/gün",
            lowSat: "Düşük Doygunluk",
            rising: "Yükselişte",
            view: "İncele"
        }
    }
};
