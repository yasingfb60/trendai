-- 1. STORES TABLE (The "Target List")
create table public.monitored_stores (
    id uuid default gen_random_uuid() primary key,
    url text not null unique, -- e.g. "https://inspireuplift.com"
    name text,
    status text default 'active', -- active, dead, error
    last_scanned_at timestamptz,
    created_at timestamptz default now()
);

-- 2. COMPETITOR PRODUCTS TABLE (The "Loot")
create table public.competitor_products (
    id uuid default gen_random_uuid() primary key,
    store_id uuid references public.monitored_stores(id),
    external_id text, -- Shopify Product ID
    title text not null,
    handle text, -- Product URL slug
    price decimal,
    image_url text,
    published_at timestamptz, -- When THEY added it
    detected_at timestamptz default now(), -- When WE found it
    is_hot boolean default false, -- If added recently by multiple stores
    
    unique(store_id, external_id) -- Prevent duplicates
);

-- 3. ENABLE PUBLIC ACCESS (For MVP Dashboard)
alter table public.monitored_stores enable row level security;
create policy "Public Stores" on public.monitored_stores for select using (true);
create policy "Public Insert Stores" on public.monitored_stores for insert with check (true);

alter table public.competitor_products enable row level security;
create policy "Public Competitor Products" on public.competitor_products for select using (true);
create policy "Public Insert Comp Products" on public.competitor_products for insert with check (true);

-- 4. SEED DATA (Top Stores to start with)
insert into public.monitored_stores (url, name) values 
('https://inspireuplift.com', 'Inspire Uplift'),
('https://warmly.com', 'Warmly'),
('https://hygo.shop', 'Hygo'),
('https://bluecrate.com', 'BlueCrate'),
('https://burbro.com', 'Burbro')
on conflict (url) do nothing;
