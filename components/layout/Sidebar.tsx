"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
    LayoutDashboard,
    TrendingUp,
    Globe,
    Factory,
    Users,
    Settings,
    LogOut,
    Plane
} from "lucide-react";
import Link from 'next/link';

import { usePathname } from 'next/navigation';

export function Sidebar() {
    const { dict } = useLanguage();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: dict.sidebar.dashboard, href: "/" },
        { icon: TrendingUp, label: dict.sidebar.trendScout, href: "/trends" },
        { icon: Globe, label: dict.sidebar.arbitrage, href: "/arbitrage" },
        { icon: Plane, label: "K-Bridge (KR->TR)", href: "/k-bridge" },
        { icon: Factory, label: dict.sidebar.suppliers, href: "/suppliers" },
        { icon: Users, label: dict.sidebar.influencers, href: "/influencers" },
        { icon: Settings, label: dict.sidebar.settings, href: "/settings" },
    ];

    // Close sidebar when route changes on mobile
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 border border-white/10 text-white"
            >
                <LayoutDashboard className="h-5 w-5" />
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/5 bg-black/90 backdrop-blur-2xl transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}>
                <div className="flex h-16 items-center px-6 border-b border-white/5 bg-gradient-to-r from-primary/10 to-transparent">
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                        TrendAI
                    </span>
                </div>

                <nav className="flex flex-col gap-2 p-4 mt-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 relative overflow-hidden ${isActive
                                    ? "text-white bg-primary/20 shadow-[0_0_20px_rgba(59,130,246,0.2)] border border-primary/20"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-r-full" />
                                )}
                                <item.icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${isActive ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                                <span className="relative z-10">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-4 w-full px-4">
                    <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-all">
                        <LogOut className="h-5 w-5" />
                        {dict.sidebar.logout}
                    </button>
                </div>
            </aside>
        </>
    );
}
