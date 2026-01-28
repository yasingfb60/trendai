'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global Error:', error);
    }, [error]);

    return (
        <html>
            <body className="bg-black text-white flex flex-col items-center justify-center min-h-screen p-8">
                <h2 className="text-4xl font-bold text-red-600 mb-4">Critical System Error</h2>
                <div className="bg-zinc-900 p-6 rounded-xl border border-red-600/50 max-w-3xl w-full overflow-auto mb-8 font-mono">
                    <p className="text-lg text-red-100 mb-2">{error.message}</p>
                    {error.stack && <pre className="text-xs text-zinc-500 whitespace-pre-wrap">{error.stack}</pre>}
                </div>
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 bg-red-600 rounded-lg font-bold hover:bg-red-700 transition-colors"
                >
                    Restart System
                </button>
            </body>
        </html>
    );
}
