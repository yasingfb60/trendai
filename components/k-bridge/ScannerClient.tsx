"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Search, Radar, ArrowRight, TrendingUp, DollarSign, Package,
    CheckCircle2, AlertTriangle, ShieldCheck, ExternalLink,
    ShoppingBag, Store, Facebook
} from "lucide-react";

interface SaturationSource {
    name: string;
    url: string;
    type: 'trendyol' | 'shopify' | 'meta';
    price?: number;
    detectionType?: 'ai-match' | 'keyword' | 'manual';
}

interface KProduct {
    id: string;
    slug?: string;
    title: string;
    image: string;
    krPrice: number;
    trSellingPrice: number;
    status: 'scanning' | 'found' | 'analyzing' | 'complete';
    metrics: {
        coupangRank: number;
        trendyolSellers: number;
        shopifyStores: number;
        metaActiveAds: number;
        details: {
            trendyol: SaturationSource[];
            shopify: SaturationSource[];
            meta: SaturationSource[];
            suppliers: SaturationSource[]; // Added suppliers list
        };
    };
    supplier: {
        name: string;
        type: string;
        price: number;
        moq: number;
    };
}

export function ScannerClient({ initialData }: { initialData: any[] }) {
    const { dict, lang } = useLanguage();
    const [isScanning, setIsScanning] = useState(false);
    const [scanStep, setScanStep] = useState(0);
    const [results, setResults] = useState<KProduct[]>([]);

    // State for the Saturation Detail Modal
    const [selectedMetric, setSelectedMetric] = useState<{ type: 'trendyol' | 'shopify' | 'meta' | 'suppliers', sources: SaturationSource[] } | null>(null);

    const startScan = () => {
        setIsScanning(true);
        setScanStep(1);
        setResults([]);

        setTimeout(() => setScanStep(2), 2500);
        setTimeout(() => setScanStep(3), 5000);
        setTimeout(() => {
            setScanStep(4);
            setIsScanning(false);

            const mappedResults = initialData.map((p, index) => ({
                id: p.id,
                title: lang === 'tr' ? p.title_tr : p.title_en,
                image: p.image_url,
                krPrice: Number(p.price),
                trSellingPrice: Number(p.price) * 35 * 1.5,
                status: 'complete' as const,
                slug: p.slug,
                metrics: {
                    coupangRank: index + 1,
                    trendyolSellers: index === 0 ? 1 : 12,
                    shopifyStores: index === 0 ? 3 : 8,
                    metaActiveAds: index === 0 ? 0 : 5,
                    details: {
                        trendyol: index === 0 ? [
                            {
                                name: "CosmeticHub TR",
                                url: "#",
                                type: 'trendyol',
                                price: 950,
                                detectedAt: `2${dict.kbridge?.time?.hour || "h"} ${dict.kbridge?.time?.ago || "ago"}`
                            }
                        ] : [],
                        shopify: index === 0 ? [
                            {
                                name: "Korendy",
                                url: "https://korendy.com.tr",
                                type: 'shopify',
                                price: 1200,
                                detectedAt: `1${dict.kbridge?.time?.day || "d"} ${dict.kbridge?.time?.ago || "ago"}`
                            },
                            {
                                name: "GlowSkin.tr",
                                url: "#",
                                type: 'shopify',
                                price: 1150,
                                detectedAt: `5${dict.kbridge?.time?.hour || "h"} ${dict.kbridge?.time?.ago || "ago"}`
                            },
                            {
                                name: "K-Beauty Istanbul",
                                url: "#",
                                type: 'shopify',
                                price: 1250,
                                detectedAt: dict.kbridge?.time?.live || "Live"
                            }
                        ] : [],
                        meta: [],
                        suppliers: [ // Added mock suppliers
                            {
                                name: "Coupang Rocket",
                                url: "#",
                                type: 'shopify', // reusing type for icon logic or adding new one
                                price: Number(p.price),
                                detectedAt: "Coupang KR"
                            },
                            {
                                name: "1688 Factory Direct",
                                url: "#",
                                type: 'shopify',
                                price: Number(p.price) * 0.7,
                                detectedAt: "Wholesale"
                            },
                            {
                                name: "Naver Smart Store",
                                url: "#",
                                type: 'shopify',
                                price: Number(p.price) * 0.9,
                                detectedAt: "Naver"
                            }
                        ]
                    }
                },
                supplier: {
                    name: index === 0 ? "CosRX Official Wholesaler" : "Seoul Mask Factory",
                    type: dict.kbridge?.supplierTypes?.distributor || "Brand Distributor",
                    price: Number(p.price) * 0.8,
                    moq: 50
                }
            }));

            setResults(mappedResults);
        }, 8000);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-black text-white p-8 space-y-8">
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                        {dict.kbridge?.title || "K-Bridge Intelligence"}
                    </h1>
                    <p className="text-slate-400 text-lg">
                        {dict.kbridge?.subtitle || "Korea to Turkey: 0% Tax Arbitrage Scanner."}
                    </p>
                </div>
                <Button
                    size="lg"
                    onClick={startScan}
                    disabled={isScanning}
                    className={`h-14 px-8 text-lg font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all ${isScanning ? 'bg-slate-800 text-slate-500' : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105'}`}
                >
                    {isScanning ? (
                        <div className="flex items-center gap-2">
                            <Radar className="h-6 w-6 animate-spin" />
                            {dict.kbridge?.ui?.scanning || "Scanning..."}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Search className="h-6 w-6" />
                            {dict.kbridge?.ui?.startScan || "Start Deep Scan"}
                        </div>
                    )}
                </Button>
            </div>

            {scanStep > 0 && (
                <Card className="bg-slate-900/50 border-blue-500/30 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-scan" />
                    <CardContent className="p-12 flex flex-col items-center justify-center gap-8 min-h-[400px]">
                        <div className="flex items-center gap-4 w-full max-w-3xl">
                            <StepIndicator active={scanStep >= 1} label={dict.kbridge?.steps?.scan || "Scanning Seoul..."} icon={<TrendingUp />} />
                            <div className={`h-1 flex-1 transition-colors duration-500 ${scanStep >= 2 ? 'bg-blue-500' : 'bg-slate-800'}`} />
                            <StepIndicator active={scanStep >= 2} label={dict.kbridge?.steps?.supplier || "Finding Suppliers..."} icon={<Package />} />
                            <div className={`h-1 flex-1 transition-colors duration-500 ${scanStep >= 3 ? 'bg-blue-500' : 'bg-slate-800'}`} />
                            <StepIndicator active={scanStep >= 3} label={dict.kbridge?.steps?.saturation || "Saturation Check..."} icon={<ShieldCheck />} />
                            <div className={`h-1 flex-1 transition-colors duration-500 ${scanStep >= 4 ? 'bg-blue-500' : 'bg-slate-800'}`} />
                            <StepIndicator active={scanStep >= 4} label={dict.kbridge?.steps?.calc || "Calculating Profit..."} icon={<DollarSign />} />
                        </div>
                        <div className="text-center space-y-2 animate-pulse">
                            <h3 className="text-2xl font-mono text-blue-400">
                                {scanStep === 1 && (dict.kbridge?.scanMessages?.step1 || "Accessing Olive Young API...")}
                                {scanStep === 2 && (dict.kbridge?.scanMessages?.step2 || "Connecting to Wholesalers...")}
                                {scanStep === 3 && (dict.kbridge?.scanMessages?.step3 || "Scanning Market...")}
                                {scanStep === 4 && (dict.kbridge?.scanMessages?.step4 || "Analysis Complete.")}
                            </h3>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {results.map((product) => (
                    <ProductResultCard
                        key={product.id}
                        product={product}
                        onMetricClick={(type, sources) => setSelectedMetric({ type, sources })}
                        dict={dict}
                    />
                ))}
            </div>

            <Dialog open={!!selectedMetric} onOpenChange={() => setSelectedMetric(null)}>
                <DialogContent className="bg-slate-900 text-white border-slate-800">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            {selectedMetric?.type === 'shopify' && <ShoppingBag className="text-green-400" />}
                            {selectedMetric?.type === 'trendyol' && <Store className="text-orange-500" />}
                            {selectedMetric?.type === 'meta' && <Facebook className="text-blue-500" />}
                            {selectedMetric?.type === 'suppliers' && <Package className="text-purple-500" />}
                            <span className="capitalize">
                                {selectedMetric?.type === 'suppliers'
                                    ? (dict.kbridge?.ui?.supplierInfo || "Supplier Info")
                                    : `${selectedMetric?.type} ${dict.kbridge?.ui?.details || "Details"}`
                                }
                            </span>
                        </DialogTitle>
                        <DialogDescription className="text-slate-400">
                            {selectedMetric?.type === 'suppliers'
                                ? (dict.kbridge?.ui?.foundSupplier || "Best detected suppliers from Korea.")
                                : (dict.kbridge?.ui?.liveData || "Live data extracted.")
                            }
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        {selectedMetric?.sources.length === 0 ? (
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                                <p className="text-green-400 font-bold">{dict.kbridge?.ui?.noCompetitors || "No Results Found!"}</p>
                            </div>
                        ) : (
                            selectedMetric?.sources.map((source, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{source.name}</p>
                                            <p className="text-xs text-slate-500">{source.detectedAt}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {source.price && <span className="font-mono text-green-400">
                                            {selectedMetric.type === 'suppliers' ? '$' : ''}{source.price} {selectedMetric.type === 'suppliers' ? '' : 'TL'}
                                        </span>}
                                        <a href={source.url} target="_blank" className="p-2 hover:bg-white/20 rounded-full transition-colors text-blue-400">
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function StepIndicator({ active, label, icon }: { active: boolean, label: string, icon: React.ReactNode }) {
    return (
        <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${active ? 'opacity-100 scale-110' : 'opacity-30 blur-[1px]'}`}>
            <div className={`h-12 w-12 rounded-full flex items-center justify-center border-2 ${active ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
                {icon}
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider ${active ? 'text-blue-400' : 'text-slate-600'}`}>{label}</span>
        </div>
    );
}

function ProductResultCard({ product, onMetricClick, dict }: { product: KProduct, onMetricClick: (type: 'trendyol' | 'shopify' | 'meta' | 'suppliers', sources: SaturationSource[]) => void, dict: any }) {
    const isBlueOcean = product.metrics.metaActiveAds === 0 && product.metrics.trendyolSellers < 3;

    return (
        <Card className="bg-slate-950 border-slate-800 hover:border-blue-500/50 transition-colors group">
            <CardContent className="p-0 flex h-full">
                <div className="w-1/3 relative overflow-hidden">
                    <img src={product.image} alt={product.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {isBlueOcean && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                            {dict.kbridge?.ui?.blueOceanBadge || "💎 BLUE OCEAN"}
                        </div>
                    )}
                </div>
                <div className="w-2/3 p-6 space-y-6">
                    <div
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => onMetricClick('suppliers', product.metrics.details.suppliers)}
                    >
                        <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-colors">
                            <Package className="h-3.5 w-3.5" />
                            <span className="text-sm font-medium">{dict.kbridge?.ui?.foundSupplier || "Found Best Supplier:"} <span className="text-white underline decoration-dotted">{product.supplier.name}</span></span>
                            <ArrowRight className="h-3 w-3 opacity-50" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                        <div>
                            <p className="text-xs text-slate-500 uppercase">{dict.kbridge?.ui?.koreaCost || "Korea Cost"}</p>
                            <p className="text-lg font-bold text-white">${product.supplier.price}</p>
                            <p className="text-[10px] text-slate-400">{dict.kbridge?.ui?.moq || "MOQ:"} {product.supplier.moq}</p>
                        </div>
                        <div className="text-right border-l border-slate-800 pl-4">
                            <p className="text-xs text-slate-500 uppercase">{dict.kbridge?.ui?.trSelling || "TR Selling"}</p>
                            <p className="text-lg font-bold text-green-400">{product.trSellingPrice.toFixed(0)} TL</p>
                            <p className="text-[10px] text-slate-400">{dict.kbridge?.ui?.estProfit || "Est. Profit:"} %{((product.trSellingPrice - (product.supplier.price * 35)) / (product.supplier.price * 35) * 100).toFixed(0)}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                            <ShieldCheck className="h-3 w-3" /> {dict.kbridge?.ui?.marketSat || "TR Market Saturation"}
                        </h4>

                        <div className="grid grid-cols-3 gap-2 text-center">
                            <SaturationMetric
                                label="Trendyol"
                                value={product.metrics.trendyolSellers}
                                warnAt={5}
                                onClick={() => onMetricClick('trendyol', product.metrics.details.trendyol)}
                            />
                            <SaturationMetric
                                label="Shopify"
                                value={product.metrics.shopifyStores}
                                warnAt={10}
                                onClick={() => onMetricClick('shopify', product.metrics.details.shopify)}
                            />
                            <SaturationMetric
                                label="Meta Ads"
                                value={product.metrics.metaActiveAds}
                                warnAt={1}
                                onClick={() => onMetricClick('meta', product.metrics.details.meta)}
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-900 flex justify-end gap-3">
                        <Link href={`/product/${product.slug || product.id}`} className="w-full">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white w-full">
                                {dict.kbridge?.ui?.viewAnalysis || "View Analysis"} <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function SaturationMetric({ label, value, warnAt, onClick }: { label: string, value: number, warnAt: number, onClick: () => void }) {
    const isSafe = value < warnAt;
    return (
        <button
            onClick={onClick}
            className={`w-full p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${isSafe ? 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20' : 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'}`}
        >
            <div className="text-lg font-bold">{value}</div>
            <div className="text-[10px] uppercase opacity-70 underline decoration-dotted underline-offset-2">{label}</div>
        </button>
    );
}
