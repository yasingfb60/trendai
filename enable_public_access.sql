-- Enable read access for everyone (Public)
alter table public.products enable row level security;
create policy "Public Products" on public.products for select using (true);

alter table public.product_metrics enable row level security;
create policy "Public Metrics" on public.product_metrics for select using (true);

alter table public.cultural_insights enable row level security;
create policy "Public Insights" on public.cultural_insights for select using (true);

alter table public.suppliers enable row level security;
create policy "Public Suppliers" on public.suppliers for select using (true);
