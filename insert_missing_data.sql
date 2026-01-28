-- 1. Insert Suppliers (I forgot these!)
insert into public.suppliers (product_id, name, type, location, moq, price_per_unit, verified)
select id, 'Al-Madina Dates Co', 'Wholesaler', 'Medina, SA', 100, 12.00, true 
from public.products where title_en = 'Premium Medjool Dates';

insert into public.suppliers (product_id, name, type, location, moq, price_per_unit, verified)
select id, 'Shenzhen CoolTech', 'Factory', 'Shenzhen, CN', 500, 4.50, true 
from public.products where title_en = 'Portable Neck Fan';

insert into public.suppliers (product_id, name, type, location, moq, price_per_unit, verified)
select id, 'Yiwu Gifts Trading', 'Trading Company', 'Yiwu, CN', 100, 3.50, false 
from public.products where title_en = 'Galaxy Rose Lamp';

-- 2. Add MORE Cultural Insights (So charts look full)
insert into public.cultural_insights (product_id, country_code, match_score, reasoning_tr, reasoning_en)
select id, 'SA', 99, 'Ramazan ayı için temel tüketim maddesi.', 'Essential staple food for Ramadan.' 
from public.products where title_en = 'Premium Medjool Dates';

insert into public.cultural_insights (product_id, country_code, match_score, reasoning_tr, reasoning_en)
select id, 'AE', 85, 'Sıcak havalarda lüks atıştırmalık.', 'Luxury snack for hot weather.' 
from public.products where title_en = 'Premium Medjool Dates';

-- 3. Update Metrics (Just to be safe)
update public.product_metrics 
set monthly_revenue = 45000, active_ads = 12 
where product_id in (select id from public.products where title_en = 'Premium Medjool Dates');
