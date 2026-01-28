"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Search, Bell, User, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Header() {
    const { lang, toggleLanguage, dict } = useLanguage();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        replace(`/?${params.toString()}`);
    }, 300);

    // Prevent hydration mismatch by rendering default or nothing until mounted
    if (!mounted) return (
        <header className="fixed top-0 right-0 z-30 flex h-16 w-[calc(100%-16rem)] items-center justify-between border-b bg-background/80 px-8 backdrop-blur-md">
            {/* Skeleton or simple default layout matching server */}
            <div className="flex items-center gap-4 w-1/3">
                <div className="relative w-full h-9 bg-muted/20 rounded-md" />
            </div>
        </header>
    );

    return (
        <header className="fixed top-0 right-0 z-30 flex h-16 w-[calc(100%-16rem)] items-center justify-between border-b bg-background/80 px-8 backdrop-blur-md">
            <div className="flex items-center gap-4 w-1/3">
                <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder={dict.header.searchPlaceholder}
                        onChange={(e) => handleSearch(e.target.value)}
                        defaultValue={searchParams.get('q')?.toString()}
                        className="h-9 w-full rounded-md border bg-background pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 font-bold"
                >
                    <Languages className="h-4 w-4" />
                    {lang === 'en' ? 'TR' : 'EN'}
                </Button>

                <button className="relative rounded-full p-2 hover:bg-accent">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
                </button>
                <div className="flex items-center gap-3 border-l pl-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">Yasin</p>
                        <p className="text-xs text-muted-foreground">{dict.header.proPlan}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                    </div>
                </div>
            </div>
        </header>
    );
}
