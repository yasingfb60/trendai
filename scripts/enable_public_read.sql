
-- Enable RLS on tables (good practice, though we will open them up)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_insights ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Read Products" ON products;
DROP POLICY IF EXISTS "Public Read Metrics" ON product_metrics;
DROP POLICY IF EXISTS "Public Read Insights" ON cultural_insights;

-- Create permissive policies for the MVP
CREATE POLICY "Public Read Products" 
ON products FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Public Read Metrics" 
ON product_metrics FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Public Read Insights" 
ON cultural_insights FOR SELECT 
TO anon, authenticated 
USING (true);

-- Also ensure duplication doesn't block future inserts
-- (Optional: cleanup duplicates if any exist, but upsert handled it)
