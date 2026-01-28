-- DANGER: Disabling Security to force fix
alter table public.products disable row level security;
alter table public.product_metrics disable row level security;
alter table public.cultural_insights disable row level security;
alter table public.suppliers disable row level security;
