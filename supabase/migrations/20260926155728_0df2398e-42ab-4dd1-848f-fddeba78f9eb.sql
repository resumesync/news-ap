revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.bump_news_views() from public, anon, authenticated;
revoke all on function public.bump_news_likes() from public, anon, authenticated;
revoke all on function public.bump_news_shares() from public, anon, authenticated;
revoke all on function public.bump_ad_events() from public, anon, authenticated;
revoke all on function public.has_role(uuid, public.app_role) from public, anon;
revoke all on function public.claim_admin() from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
grant execute on function public.claim_admin() to authenticated;