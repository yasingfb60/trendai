import { ScannerClient } from "@/components/k-bridge/ScannerClient";
import { getKoreanOpportunities } from "@/lib/api";

export default async function KBridgePage() {
    const products = await getKoreanOpportunities();
    return <ScannerClient initialData={products} />;
}
