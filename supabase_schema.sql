-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Create PRODUCTS table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title_tr text not null,
  title_en text not null,
  description_tr text,
  description_en text,
  price numeric default 0,
  currency text default 'USD',
  image_url text,
  category text,
  is_active boolean default true
);

-- 3. Create PRODUCT_METRICS table
create table public.product_metrics (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  daily_sales integer default 0,
  monthly_revenue numeric default 0,
  gross_margin numeric default 0,
  roas numeric default 0,
  active_ads integer default 0,
  saturation_score integer default 0,
  ad_countries text[] -- Array of country codes e.g. ['US', 'TR']
);

-- 4. Create SUPPLIERS table
create table public.suppliers (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  name text not null,
  type text check (type in ('Factory', 'Wholesaler', 'Trading Company', 'Distributor')),
  location text,
  moq integer,
  price_per_unit numeric,
  lead_time text,
  verified boolean default false
);

-- 5. Create CULTURAL_INSIGHTS table
create table public.cultural_insights (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  country_code text not null, -- e.g. 'TR'
  match_score integer default 0,
  reasoning_tr text,
  reasoning_en text
);

-- 6. Insert Mock Data (So the app isn't empty)
insert into public.products (title_en, title_tr, price, image_url, category)
values 
('Portable Neck Fan', 'Taşınabilir Boyun Fanı', 29.99, 'https://images.unsplash.com/photo-1618360987399-j9s8a8a8a8a8?w=800&q=80', 'Electronics'),
('Premium Medjool Dates', 'Premium Medine Hurması', 45.00, 'https://images.unsplash.com/photo-1595411425732-e69c1ce3f64c?w=800&q=80', 'Food');
