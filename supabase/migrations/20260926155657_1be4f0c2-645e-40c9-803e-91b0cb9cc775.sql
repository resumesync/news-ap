-- roles
create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

-- first account can claim admin
create or replace function public.claim_admin()
returns boolean language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid();
begin
  if uid is null then return false; end if;
  if exists (select 1 from public.user_roles where role = 'admin') then
    return exists (select 1 from public.user_roles where user_id = uid and role = 'admin');
  end if;
  insert into public.user_roles (user_id, role) values (uid, 'admin') on conflict do nothing;
  return true;
end; $$;
grant execute on function public.claim_admin() to authenticated;

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- news
create table public.news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null default '',
  content text not null default '',
  image_url text,
  video_url text,
  published_date date not null default current_date,
  published_time time not null default '09:00',
  status text not null default 'draft' check (status in ('draft','published','unpublished')),
  views integer not null default 0,
  likes integer not null default 0,
  shares integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index news_status_published_idx on public.news (status, published_date desc, published_time desc);
grant select on public.news to anon;
grant select, insert, update, delete on public.news to authenticated;
grant all on public.news to service_role;
alter table public.news enable row level security;
create policy "anyone reads published news" on public.news for select to anon, authenticated using (status = 'published');
create policy "admins read all news" on public.news for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins insert news" on public.news for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "admins update news" on public.news for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admins delete news" on public.news for delete to authenticated using (public.has_role(auth.uid(),'admin'));
create trigger news_updated_at before update on public.news for each row execute function public.set_updated_at();

-- advertisements
create table public.advertisements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text,
  target_url text,
  position text not null default 'between_news' check (position in ('top','between_news','news_content','bottom','sticky_bottom')),
  frequency integer not null default 4 check (frequency between 1 and 50),
  start_date date,
  end_date date,
  status text not null default 'active' check (status in ('active','disabled')),
  impressions integer not null default 0,
  clicks integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.advertisements to anon;
grant select, insert, update, delete on public.advertisements to authenticated;
grant all on public.advertisements to service_role;
alter table public.advertisements enable row level security;
create policy "anyone reads active ads" on public.advertisements for select to anon, authenticated
  using (status = 'active' and (start_date is null or start_date <= current_date) and (end_date is null or end_date >= current_date));
create policy "admins read all ads" on public.advertisements for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins insert ads" on public.advertisements for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "admins update ads" on public.advertisements for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admins delete ads" on public.advertisements for delete to authenticated using (public.has_role(auth.uid(),'admin'));
create trigger ads_updated_at before update on public.advertisements for each row execute function public.set_updated_at();

-- settings
create table public.site_settings (
  id boolean primary key default true check (id),
  site_name text not null default 'EIGHT NEWS',
  logo_url text,
  favicon_url text,
  contact_email text,
  contact_phone text,
  contact_address text,
  facebook_url text,
  x_url text,
  instagram_url text,
  whatsapp_url text,
  ads_enabled boolean not null default true,
  default_ad_frequency integer not null default 4 check (default_ad_frequency between 1 and 50),
  updated_at timestamptz not null default now()
);
grant select on public.site_settings to anon;
grant select, insert, update on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "anyone reads settings" on public.site_settings for select to anon, authenticated using (true);
create policy "admins insert settings" on public.site_settings for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "admins update settings" on public.site_settings for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();

-- engagement tables
create table public.news_views (
  id uuid primary key default gen_random_uuid(),
  news_id uuid not null references public.news(id) on delete cascade,
  device_id text not null,
  created_at timestamptz not null default now(),
  unique (news_id, device_id)
);
create table public.news_likes (
  id uuid primary key default gen_random_uuid(),
  news_id uuid not null references public.news(id) on delete cascade,
  device_id text not null,
  created_at timestamptz not null default now(),
  unique (news_id, device_id)
);
create table public.news_shares (
  id uuid primary key default gen_random_uuid(),
  news_id uuid not null references public.news(id) on delete cascade,
  device_id text not null,
  channel text not null default 'link',
  created_at timestamptz not null default now()
);
create table public.ad_events (
  id uuid primary key default gen_random_uuid(),
  ad_id uuid not null references public.advertisements(id) on delete cascade,
  device_id text not null,
  event_type text not null check (event_type in ('impression','click')),
  created_at timestamptz not null default now()
);

grant select, insert on public.news_views to anon, authenticated;
grant select, insert, delete on public.news_likes to anon, authenticated;
grant select, insert on public.news_shares to anon, authenticated;
grant select, insert on public.ad_events to anon, authenticated;
grant all on public.news_views, public.news_likes, public.news_shares, public.ad_events to service_role;

alter table public.news_views enable row level security;
alter table public.news_likes enable row level security;
alter table public.news_shares enable row level security;
alter table public.ad_events enable row level security;

create policy "anyone records a view" on public.news_views for insert to anon, authenticated with check (true);
create policy "admins read views" on public.news_views for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "anyone reads likes" on public.news_likes for select to anon, authenticated using (true);
create policy "anyone likes" on public.news_likes for insert to anon, authenticated with check (true);
create policy "anyone unlikes" on public.news_likes for delete to anon, authenticated using (true);
create policy "anyone records a share" on public.news_shares for insert to anon, authenticated with check (true);
create policy "admins read shares" on public.news_shares for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "anyone records ad event" on public.ad_events for insert to anon, authenticated with check (true);
create policy "admins read ad events" on public.ad_events for select to authenticated using (public.has_role(auth.uid(),'admin'));

-- counter triggers
create or replace function public.bump_news_views()
returns trigger language plpgsql security definer set search_path = public as $$
begin update public.news set views = views + 1 where id = new.news_id; return new; end; $$;
create trigger news_views_bump after insert on public.news_views for each row execute function public.bump_news_views();

create or replace function public.bump_news_likes()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    update public.news set likes = likes + 1 where id = new.news_id; return new;
  else
    update public.news set likes = greatest(likes - 1, 0) where id = old.news_id; return old;
  end if;
end; $$;
create trigger news_likes_bump after insert or delete on public.news_likes for each row execute function public.bump_news_likes();

create or replace function public.bump_news_shares()
returns trigger language plpgsql security definer set search_path = public as $$
begin update public.news set shares = shares + 1 where id = new.news_id; return new; end; $$;
create trigger news_shares_bump after insert on public.news_shares for each row execute function public.bump_news_shares();

create or replace function public.bump_ad_events()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.event_type = 'impression' then
    update public.advertisements set impressions = impressions + 1 where id = new.ad_id;
  else
    update public.advertisements set clicks = clicks + 1 where id = new.ad_id;
  end if;
  return new;
end; $$;
create trigger ad_events_bump after insert on public.ad_events for each row execute function public.bump_ad_events();

-- seed settings
insert into public.site_settings (id, site_name, contact_email, contact_phone, contact_address, facebook_url, x_url, instagram_url, whatsapp_url, ads_enabled, default_ad_frequency)
values (true, 'EIGHT NEWS', 'desk@eightnews.in', '+91 98765 43210', 'Eight News House, Banjara Hills, Hyderabad 500034', 'https://facebook.com/eightnews', 'https://x.com/eightnews', 'https://instagram.com/eightnews', 'https://wa.me/919876543210', true, 4);

-- seed news
insert into public.news (slug, title, short_description, content, image_url, video_url, published_date, published_time, status, views, likes, shares) values
('metro-phase-three-opens-to-record-ridership',
 'Metro Phase Three opens to record ridership as the city rewrites its commute',
 'The newest corridor carried more than four lakh passengers on its first working day, easing pressure on the arterial roads that have defined the city''s rush hour for a decade.',
 E'The newest stretch of the city metro opened to the public at first light, and by the time the evening peak had passed, the transit authority counted more than four lakh journeys on the corridor alone.\n\nFor commuters who have spent years negotiating the arterial road that runs parallel to the line, the change was immediate. Travel time between the two ends of the corridor fell from an unpredictable ninety minutes to a scheduled thirty-four.\n\n"We planned for three lakh riders in the first month, not the first day," a senior official at the transit authority said, standing on a platform still crowded well after nine in the evening.\n\nEngineers say the corridor''s signalling system allows trains every one hundred and ten seconds at peak load, a margin the network has never operated at before. Additional rakes are expected to join the line before the festival season, when ridership traditionally rises by a fifth.\n\nThe question now facing the city is what happens to the surface. Traffic police recorded a fourteen per cent drop in vehicle volume on the parallel road, the first meaningful decline in eleven years of monitoring.',
 '/__l5e/assets-v1/21d2629f-3a05-4795-ab3a-1736c8a19e0b/news1.jpg', null, current_date, '07:40', 'published', 12540, 820, 315),
('monsoon-surplus-lifts-kharif-sowing-to-a-five-year-high',
 'Monsoon surplus lifts kharif sowing to a five-year high',
 'Reservoir levels are at eighty-one per cent of capacity and farmers across three districts have expanded acreage, though agronomists warn that late rain could complicate the harvest window.',
 E'A monsoon that arrived four days early and stayed has pushed kharif sowing to its highest level in five years, according to figures released by the state agriculture department.\n\nAcreage under paddy rose eleven per cent, while pulses recorded the sharpest expansion at nineteen per cent. Reservoirs across the three principal irrigation basins stand at eighty-one per cent of capacity, comfortably above the ten-year average for the season.\n\nAgronomists are cautious. "A surplus at sowing is not a surplus at harvest," said one researcher who has studied the basin for two decades. "If the withdrawal is delayed the way it was two seasons ago, standing crop is at risk in exactly the districts that expanded the most."\n\nProcurement centres are being readied earlier than usual, and the department has asked mandis to extend weighing hours through the first fortnight of the harvest.',
 '/__l5e/assets-v1/c395e035-e5f3-4c65-8f79-7156193a6314/news2.jpg', null, current_date, '06:15', 'published', 8410, 512, 190),
('the-quiet-engineering-boom-in-the-citys-second-ring',
 'The quiet engineering boom in the city''s second ring',
 'Away from the glass towers of the central business district, a cluster of small hardware firms has begun designing components that once arrived only by import.',
 E'The office is on the fourth floor of a building with no lobby to speak of, and inside it a team of nineteen engineers is designing a power-management chip that, until recently, would have been bought abroad.\n\nThere are now more than two hundred such firms in the city''s second ring, according to an industry body that began counting them three years ago. Together they employ close to fourteen thousand people, most of them under thirty.\n\nWhat changed was not capital so much as patience. "Our first customer took eleven months to say yes," the company''s founder said. "The second took six weeks, because the first one existed."\n\nThe constraint now is testing infrastructure. Firms describe waiting lists of several weeks for validation equipment, a bottleneck that the state''s new electronics policy promises to address through shared facilities.',
 '/__l5e/assets-v1/eef3f893-3fa5-4825-a5f8-5838c9c6737f/news3.jpg', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', current_date - 1, '18:05', 'published', 6320, 401, 122),
('a-festival-season-that-filled-every-auditorium',
 'A festival season that filled every auditorium in the old quarter',
 'Ninety-one performances across eleven days, and for the first time organisers had to turn audiences away from the free evening recitals.',
 E'The old quarter''s festival has run for thirty-eight years, and for most of them the evening recitals were a comfortable affair with seats to spare. This year, organisers stopped issuing passes on the fourth day.\n\nNinety-one performances took place across eleven days, spanning classical dance, percussion ensembles and two commissioned works by younger choreographers. Attendance crossed sixty-two thousand, roughly double the figure recorded five years ago.\n\nThe festival''s artistic director attributes the shift to a deliberate change in scheduling: recitals now begin at seven rather than half past eight, a small adjustment that opened the evening to families travelling from the suburbs.\n\nFunding remains fragile. Two of the three principal sponsors signed one-year agreements, and the trust that runs the festival says it is looking for a longer commitment before it can expand the programme further.',
 '/__l5e/assets-v1/86170be3-031a-4a76-b4f0-00dd1f5e6115/news4.jpg', null, current_date - 1, '11:30', 'published', 5120, 388, 96),
('a-floodlit-final-and-the-longest-over-of-the-season',
 'A floodlit final, and the longest over of the season',
 'Twelve runs were needed from six balls. What followed took eleven minutes, three reviews and a crowd of forty thousand on its feet.',
 E'Twelve from six, floodlights at full strength, and a crowd of forty thousand that had not sat down since the eighteenth over.\n\nThe over took eleven minutes. Two reviews went upstairs, a third was withdrawn, and the fielding captain changed his plan twice between deliveries. By the fourth ball the equation had narrowed to seven from three.\n\nWhat decided it was not a boundary but a misfield at deep midwicket, the kind of small error that a season of preparation cannot legislate against. Two became three, and the chase was complete with a ball remaining.\n\nThe winning side''s coach was careful afterwards. "We were outplayed for fourteen overs," he said. "We were better for six. That is the format."',
 '/__l5e/assets-v1/0fbc6406-b5c4-4aa3-a65e-6931bdf22f85/news5.jpg', null, current_date - 2, '22:50', 'published', 18730, 1544, 602),
('civic-budget-shifts-a-third-of-spending-to-drainage',
 'Civic budget shifts a third of spending to drainage',
 'The corporation has committed the largest share of its capital outlay in two decades to stormwater work, after a season that flooded nineteen low-lying wards.',
 E'The corporation''s capital budget, presented to the standing committee this week, allocates thirty-four per cent of outlay to stormwater drainage — the largest single share committed to the sector in at least two decades.\n\nNineteen low-lying wards flooded during the season, several of them repeatedly. An internal review found that two-thirds of the affected stretches drained into channels built for a rainfall intensity last revised in 1998.\n\nThe plan funds the rebuilding of four primary channels and the desilting of one hundred and twelve kilometres of secondary drains before the next monsoon. Ward-level committees will publish monthly progress, a transparency measure demanded by residents'' associations after last year''s delays.\n\nCritics note that road resurfacing has been cut by nine per cent to fund the shift. The commissioner''s response was blunt: "A resurfaced road under two feet of water is not a road."',
 '/__l5e/assets-v1/21d2629f-3a05-4795-ab3a-1736c8a19e0b/news1.jpg', null, current_date - 3, '09:20', 'published', 4290, 233, 71),
('draft-a-longer-look-at-the-river-restoration-plan',
 'A longer look at the river restoration plan',
 'Working draft: interviews pending with the basin authority and two riparian panchayats.',
 E'Draft copy. Interviews pending.',
 null, null, current_date, '10:00', 'draft', 0, 0, 0);

-- seed ads
insert into public.advertisements (title, image_url, target_url, position, frequency, start_date, end_date, status, impressions, clicks) values
('Eight Prime Subscription', '/__l5e/assets-v1/981b9c93-2e02-493a-9476-ff213afd7c87/ad1.jpg', 'https://example.com/eight-prime', 'between_news', 4, current_date - 10, current_date + 60, 'active', 25420, 1250),
('Eight Prime — Top Banner', '/__l5e/assets-v1/981b9c93-2e02-493a-9476-ff213afd7c87/ad1.jpg', 'https://example.com/eight-prime', 'top', 4, current_date - 10, current_date + 60, 'active', 18240, 640),
('Eight Prime — In Article', '/__l5e/assets-v1/981b9c93-2e02-493a-9476-ff213afd7c87/ad1.jpg', 'https://example.com/eight-prime', 'news_content', 4, current_date - 5, current_date + 60, 'active', 9110, 402),
('Eight Prime — Sticky', '/__l5e/assets-v1/981b9c93-2e02-493a-9476-ff213afd7c87/ad1.jpg', 'https://example.com/eight-prime', 'sticky_bottom', 4, current_date - 5, current_date + 30, 'disabled', 3100, 88);