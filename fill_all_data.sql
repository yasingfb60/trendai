-- 1. Complete NECK FAN Data
-- Add Cultural Insight
insert into public.cultural_insights (product_id, country_code, match_score, reasoning_tr, reasoning_en)
select id, 'JP', 92, 'Nemli yazlarda toplu taşıma kullananlar için hayat kurtarıcı.', 'Lifesaver for commuters during humid summers.'
from public.products where title_en = 'Portable Neck Fan';

-- Update Metrics (Make it look successful)
update public.product_metrics 
set monthly_revenue = 25000, active_ads = 8, gross_margin = 65, roas = 4.2
where product_id in (select id from public.products where title_en = 'Portable Neck Fan');


-- 2. Complete GALAXY ROSE Data
-- Add Cultural Insight
insert into public.cultural_insights (product_id, country_code, match_score, reasoning_tr, reasoning_en)
select id, 'US', 95, 'Sevgililer günü için #1 numaralı hediye seçimi.', '#1 Gift choice for Valentines Day.'
from public.products where title_en = 'Galaxy Rose Lamp';

-- Add Supplier (If missing)
insert into public.suppliers (product_id, name, type, location, moq, price_per_unit, verified)
select id, 'Yiwu Gifts Import', 'Trading Company', 'Yiwu, CN', 100, 5.50, false
from public.products where title_en = 'Galaxy Rose Lamp'
AND NOT EXISTS (select 1 from public.suppliers where name = 'Yiwu Gifts Import');

-- Update Metrics
update public.product_metrics
set monthly_revenue = 80000, active_ads = 50, gross_margin = 75, roas = 6.1
where product_id in (select id from public.products where title_en = 'Galaxy Rose Lamp');
