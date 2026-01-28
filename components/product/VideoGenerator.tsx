"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Download, Music, Wand2, Loader2, Share2, Layers } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface VideoStyle {
    id: string;
    name: string;
    description: string;
    color: string;
    duration: number; // seconds
}

const STYLES: VideoStyle[] = [
    { id: "viral", name: "🔥 Viral TikTok", description: "Fast cuts, upbeat music, overlay text.", color: "bg-pink-500", duration: 15 },
    { id: "cinematic", name: "🎬 Cinematic", description: "Slow zoom, elegant transitions, soft piano.", color: "bg-purple-500", duration: 30 },
    { id: "minimal", name: "✨ Minimal", description: "Clean background, focus on product details.", color: "bg-blue-500", duration: 10 },
];

export function VideoGenerator({ product }: { product: Product }) {
    const { dict } = useLanguage();
    const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [videoReady, setVideoReady] = useState(false);

    // Simulate Video Generation Process
    const handleGenerate = () => {
        setIsGenerating(true);
        setProgress(0);
        setVideoReady(false);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsGenerating(false);
                    setVideoReady(true);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 15); // Random increment
            });
        }, 500);
    };

    return (
        <Card className="border-border/50 bg-gradient-to-br from-card to-background">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Wand2 className="h-5 w-5 text-purple-500" />
                            {dict.product.competitor?.video?.title || "AI Video Creator"}
                        </CardTitle>
                        <CardDescription>
                            {dict.product.competitor?.video?.desc || "Turn product images into viral Reels/TikToks instantly."}
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                        BETA
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT: CONTROLS */}
                    <div className="space-y-6">
                        {/* Style Selector */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-muted-foreground">{dict.product.competitor?.video?.selectVibe || "Select Vibe"}</label>
                            <div className="grid grid-cols-1 gap-3">
                                {STYLES.map((style) => (
                                    <button
                                        key={style.id}
                                        onClick={() => setSelectedStyle(style)}
                                        className={`flex items-center gap-4 p-3 rounded-xl border transition-all text-left group ${selectedStyle.id === style.id
                                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                                            : "border-border hover:border-primary/50 hover:bg-accent/50"
                                            }`}
                                    >
                                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-white shadow-lg ${style.color}`}>
                                            <Play className="h-5 w-5 fill-current" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold">{style.name}</span>
                                                <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">
                                                    {style.duration}s
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-0.5">{style.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Music Selector (Static for now) */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-muted-foreground">{dict.product.competitor?.video?.soundtrack || "Soundtrack"}</label>
                            <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
                                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                                    <Music className="h-4 w-4 text-white" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-medium truncate">Trending: "Success Mindset"</p>
                                    <p className="text-xs text-muted-foreground">Royalty Free • Upbeat</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Layers className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <Button
                            className="w-full h-12 text-base font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-900/20"
                            onClick={handleGenerate}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                    {dict.product.competitor?.video?.rendering || "Rendering Video"} ({progress}%)...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="h-5 w-5 mr-2" />
                                    {dict.product.competitor?.video?.generate || "Generate Video"}
                                </>
                            )}
                        </Button>
                    </div>

                    {/* RIGHT: PREVIEW AREA */}
                    <div className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden border-4 border-gray-800 shadow-2xl mx-auto w-full max-w-[320px] group">
                        {/* Phone Notion */}
                        <div className="absolute top-0 left-0 right-0 h-6 bg-black/50 z-20 flex justify-center items-center gap-1">
                            <div className="w-16 h-4 bg-black rounded-b-xl border border-white/10" />
                        </div>

                        {/* Content */}
                        {videoReady ? (
                            // FINISHED VIDEO PREVIEW (Simulated with CSS Animation)
                            <div className="relative w-full h-full">
                                {/* Simulated Video Content */}
                                <div className="absolute inset-0 animate-[kenburns_15s_infinite_alternate]">
                                    <img
                                        src={product.imageUrl || "/placeholder.jpg"}
                                        alt="Video Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

                                {/* Overlay Text */}
                                <div className="absolute bottom-20 left-4 right-4 text-white space-y-2 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-500">
                                    <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded w-fit mb-2">
                                        LIMITED OFFER
                                    </div>
                                    <h3 className="text-2xl font-black uppercase leading-tight drop-shadow-md">
                                        {product.title?.split(" ").slice(0, 3).join(" ")}...
                                    </h3>
                                    <p className="text-lg font-medium text-white/90">
                                        Only ${product.price} 🚀
                                    </p>
                                </div>

                                {/* Floating UI Elements (Like TikTok) */}
                                <div className="absolute right-2 bottom-20 flex flex-col gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
                                            <div className="h-5 w-5 bg-white/80 rounded-sm" />
                                        </div>
                                    ))}
                                </div>

                                {/* Progress Bar */}
                                <div className="absolute bottom-1 left-2 right-2 h-1 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-full animate-[width_15s_linear_infinite]" />
                                </div>

                                {/* Overlay Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
                                        <Play className="h-8 w-8 text-white fill-white ml-1" />
                                    </div>
                                </div>
                            </div>
                        ) : isGenerating ? (
                            // LOADING STATE
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 text-white space-y-4">
                                <Loader2 className="h-12 w-12 text-purple-500 animate-spin" />
                                <div className="text-center space-y-1">
                                    <p className="font-bold">{dict.product.competitor?.video?.rendering || "Rendering..."}</p>
                                    <p className="text-xs text-zinc-400">Scenes: {Math.floor(progress / 20)}/5 Rendered</p>
                                </div>
                                <div className="w-48 h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 transition-all duration-300 ease-out"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        ) : (
                            // EMPTY STATE
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 text-white/50 space-y-4 p-8 text-center">
                                <div className="h-20 w-20 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5">
                                    <Play className="h-8 w-8 text-white/20" />
                                </div>
                                <p className="text-sm">{dict.product.competitor?.video?.clickToPreview || "Click 'Generate' to Create Preview"}</p>
                            </div>
                        )}

                        {/* Download Controls */}
                        {videoReady && (
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-zinc-900 flex items-center justify-around px-4 border-t border-white/10">
                                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 flex-1 gap-2">
                                    <Download className="h-4 w-4" /> {dict.product.competitor?.video?.save || "Save"}
                                </Button>
                                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 flex-1 gap-2">
                                    <Share2 className="h-4 w-4" /> {dict.product.competitor?.video?.post || "Post"}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
