import { Suspense } from "react";
import { getRawProducts, getCompetitorProducts } from "@/lib/api";
import { runSmartSearch } from "@/lib/bot";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const dynamic = 'force-dynamic'; // Disable caching to see DB updates instantly

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q;

  // 0. GENERATE LIVE DATA if this is a new search (Server Side Trigger)
  if (typeof q === 'string' && q.trim().length > 2) {
    await runSmartSearch(q);
  }

  // Fetch on SERVER SIDE (Bypasses Browser/CORS issues)
  const [rawProducts, competitorProducts] = await Promise.all([
    getRawProducts(),
    getCompetitorProducts()
  ]);

  return (
    <Suspense fallback={<div className="p-8">Loading Dashboard...</div>}>
      <DashboardClient
        rawProducts={rawProducts}
        competitorProducts={competitorProducts}
      />
    </Suspense>
  );
}
