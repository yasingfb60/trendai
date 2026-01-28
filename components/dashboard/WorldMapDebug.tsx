"use client";

export function WorldMapDebug() {
    return (
        <div className="w-full h-full bg-pink-500 flex items-center justify-center border-4 border-yellow-400">
            <div className="text-center p-4 bg-white rounded-xl shadow-xl">
                <h1 className="text-3xl font-black text-black mb-2">GÖRÜNÜYOR MU?</h1>
                <p className="text-lg text-gray-600">Bu bir test bileşenidir.</p>
                <div className="mt-4 p-2 bg-blue-100 text-blue-800 rounded font-mono text-xs">
                    Component: WorldMapDebug
                </div>
            </div>
        </div>
    );
}
