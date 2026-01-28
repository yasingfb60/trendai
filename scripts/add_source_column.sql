
-- Add source column to products table if it doesn't exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS source text DEFAULT 'Amazon';

-- Create index for faster filtering by source
CREATE INDEX IF NOT EXISTS idx_products_source ON products(source);

-- Verify it exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'source';
