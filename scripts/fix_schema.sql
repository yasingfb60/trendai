
-- 1. Add the missing 'source' column (This is why new bots are failing)
ALTER TABLE products ADD COLUMN IF NOT EXISTS source text DEFAULT 'Amazon';

-- 2. Add indexes to make the dashboard fast
CREATE INDEX IF NOT EXISTS idx_products_source ON products(source);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- 3. Verify it worked (Optional, for your peace of mind)
SELECT column_name FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'source';
