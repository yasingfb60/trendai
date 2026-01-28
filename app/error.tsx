'use client';

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Page Error:', error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
            <h2 className="text-3xl font-bold text-red-500 mb-4">Something went wrong!</h2>
            <div className="bg-zinc-900 p-4 rounded-lg border border-red-500/30 max-w-2xl w-full overflow-auto mb-8">
                <p className="font-mono text-sm text-red-200">{error.message}</p>
                {error.digest && <p className="text-xs text-zinc-500 mt-2">Digest: {error.digest}</p>}
            </div>
            <Button
                variant="outline"
                onClick={() => reset()}
                className="bg-white text-black hover:bg-gray-200"
            >
                Try again
            </Button>
        </div>
    );
}
