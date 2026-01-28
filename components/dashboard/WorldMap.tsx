"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";
import createGlobe from "cobe";
import { Product } from "@/types";

// COUNTRY COORDINATES MAPPING
const COUNTRY_COORDS: Record<string, [number, number]> = {
    'US': [37.0902, -95.7129],
    'TR': [38.9637, 35.2433],
    'DE': [51.1657, 10.4515],
    'JP': [36.2048, 138.2529],
    'KR': [35.9078, 127.7669],
    'CN': [35.8617, 104.1954],
    'GB': [55.3781, -3.4360],
    'FR': [46.2276, 2.2137],
    'IT': [41.8719, 12.5674],
    'ES': [40.4637, -3.7492],
    'CA': [56.1304, -106.3468],
    'AU': [-25.2744, 133.7751],
    'BR': [-14.2350, -51.9253],
    'RU': [61.5240, 105.3188],
    'AE': [23.4241, 53.8478],
    'SA': [23.8859, 45.0792],
};

const MOCK_SALES_DATA = [
    { id: '1', name: 'Wireless Buds', price: '$129', country: 'US', time: 'Just now', trend: 'up' },
    { id: '2', name: 'Yoga Mat', price: '$45', country: 'TR', time: '2s ago', trend: 'up' },
    { id: '3', name: 'Smart Watch', price: '$89', country: 'DE', time: '5s ago', trend: 'stable' },
];

export function WorldMap({ region, products = [] }: { region: string, products?: Product[] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const [r, setR] = useState(0);

    // 1. Generate Markers from Real Products (Cultural Fit)
    const markers = useMemo(() => {
        const generatedMarkers: { location: [number, number], size: number }[] = [];

        // If real products exist, use their cultural fit countries
        if (products && products.length > 0) {
            products.forEach(p => {
                p.culturalFit.forEach(fit => {
                    const coords = COUNTRY_COORDS[fit.countryCode] || COUNTRY_COORDS['US'];
                    generatedMarkers.push({ location: coords, size: 0.05 });
                });
                // Also add ad countries from metrics if available
                p.metrics.adCountries?.forEach(code => {
                    if (COUNTRY_COORDS[code]) {
                        generatedMarkers.push({ location: COUNTRY_COORDS[code], size: 0.03 });
                    }
                });
            });
        }

        // Fallback or explicit cities if empty (to ensure globe isn't empty)
        if (generatedMarkers.length === 0) {
            return [
                { location: [37.7595, -122.4367] as [number, number], size: 0.05 }, // SF
                { location: [41.0082, 28.9784] as [number, number], size: 0.05 }, // Istanbul
                { location: [35.6762, 139.6503] as [number, number], size: 0.05 }, // Tokyo
            ];
        }

        return generatedMarkers.slice(0, 50); // Limit to 50 markers for performance
    }, [products]);

    // 2. Generate Live Feed from Real Products
    const salesFeed = useMemo(() => {
        if (!products || products.length === 0) return MOCK_SALES_DATA;

        return products.slice(0, 10).map(p => ({
            id: p.id,
            name: p.title,
            price: `$${p.price}`,
            country: p.culturalFit[0]?.countryCode || 'US',
            time: 'Live',
            trend: p.metrics.dailySales > 100 ? 'up' : 'stable'
        }));
    }, [products]);

    useEffect(() => {
        let phi = 0;
        let width = 0;
        let time = 0;

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
            markers: markers,
            onRender: (state) => {
                time += 0.05;
                if (!pointerInteracting.current) {
                    phi += 0.001;
                }
                state.phi = phi + r;
                state.width = width * 2;
                state.height = width * 2;
                state.markers = markers.map((marker, index) => {
                    const baseSize = marker.size;
                    const pulse = Math.sin(time + index) * 0.02;
                    return { location: marker.location, size: Math.max(0.01, baseSize + pulse) };
                });
            },
        });

        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth;
            }
        }
        window.addEventListener('resize', onResize);
        onResize();

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, [r, markers]);

    return (
        <div className="flex w-full h-full min-h-[400px] bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
            {/* 1. Globe Area */}
            <div
                className="flex-1 relative flex items-center justify-center cursor-grab active:cursor-grabbing bg-[#1e293b]"
                style={{ position: 'relative', overflow: 'hidden' }}
            >
                <canvas
                    ref={canvasRef}
                    style={{ width: '100%', height: '100%', maxWidth: '500px', aspectRatio: 1 }}
                    onPointerDown={(e) => {
                        pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
                    }}
                    onPointerUp={() => {
                        pointerInteracting.current = null;
                    }}
                    onPointerOut={() => {
                        pointerInteracting.current = null;
                    }}
                    onMouseMove={(e) => {
                        if (pointerInteracting.current !== null) {
                            const delta = e.clientX - pointerInteracting.current;
                            pointerInteractionMovement.current = delta;
                            setR(delta / 200);
                        }
                    }}
                    onTouchMove={(e) => {
                        if (pointerInteracting.current !== null && e.touches[0]) {
                            const delta = e.touches[0].clientX - pointerInteracting.current;
                            pointerInteractionMovement.current = delta;
                            setR(delta / 200);
                        }
                    }}
                />
            </div>

            {/* 2. Sidebar Feed */}
            <div className="w-[200px] bg-slate-900 border-l border-slate-800 flex flex-col">
                <div className="p-3 border-b border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-2 uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Canlı Pazar ({salesFeed.length})
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                    {salesFeed.map((sale, i) => (
                        <Link
                            key={i}
                            href={`/product/${sale.id}`}
                            className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded hover:bg-slate-800/80 transition-all group border border-transparent hover:border-slate-700 cursor-pointer"
                        >
                            <span className={`font-mono font-bold ${sale.trend === 'up' ? 'text-green-400' :
                                sale.trend === 'down' ? 'text-red-400' : 'text-blue-400'
                                }`}>
                                {sale.price}
                            </span>
                            <div className="flex flex-col min-w-0">
                                <span className="truncate font-medium group-hover:text-white transition-colors">
                                    {sale.name}
                                </span>
                                <span className="text-[9px] text-slate-500">{sale.time}</span>
                            </div>
                            <span className="ml-auto text-[9px] font-bold text-slate-500 border border-slate-700 px-1 rounded bg-slate-950/50">
                                {sale.country}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
