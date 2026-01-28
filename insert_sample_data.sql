-- Clean up existing test data (optional, to avoid duplicates)
truncate table public.products cascade;

-- Insert Products
insert into public.products (title_en, title_tr, price, image_url, category, is_active)
values 
('Portable Neck Fan', 'Taşınabilir Boyun Fanı', 29.99, 'https://images.unsplash.com/photo-1618360987399-j9s8a8a8a8a8?w=800&q=80', 'Electronics', true),
('Premium Medjool Dates', 'Premium Medine Hurması', 45.00, 'https://images.unsplash.com/photo-1595411425732-e69c1ce3f64c?w=800&q=80', 'Food', true),
('Galaxy Rose Lamp', 'Sonsuzluk Gül Lambası', 34.00, 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&q=80', 'Gifts', true);

-- Insert Metrics (Linked to products)
insert into public.product_metrics (product_id, daily_sales, saturation_score, ad_countries)
select id, 120, 45, ARRAY['US', 'TR'] from public.products where title_en = 'Portable Neck Fan';

insert into public.product_metrics (product_id, daily_sales, saturation_score, ad_countries)
select id, 850, 30, ARRAY['SA', 'AE'] from public.products where title_en = 'Premium Medjool Dates';

insert into public.product_metrics (product_id, daily_sales, saturation_score, ad_countries)
select id, 500, 60, ARRAY['US', 'GB'] from public.products where title_en = 'Galaxy Rose Lamp';

-- Insert Cultural Insights
insert into public.cultural_insights (product_id, country_code, match_score)
select id, 'TR', 95 from public.products where title_en = 'Premium Medjool Dates';
