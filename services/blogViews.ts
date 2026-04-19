import { BlogPost } from '../types';
import { getVisitorContext } from './visitorSession';

const VIEWED_STORAGE_KEY = 'nexius_blog_viewed_slugs';

const getSupabaseConfig = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return { supabaseUrl, supabaseAnonKey };
};

export const fetchBlogViewCounts = async (slugs: string[]) => {
  const config = getSupabaseConfig();

  if (!config || slugs.length === 0) {
    return {};
  }

  const response = await fetch(`${config.supabaseUrl}/functions/v1/get-blog-view-counts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.supabaseAnonKey}`,
    },
    body: JSON.stringify({ slugs }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch blog view counts');
  }

  const payload = (await response.json()) as { counts?: Record<string, number> };
  return payload.counts ?? {};
};

export const recordBlogArticleView = async (slug: string) => {
  if (typeof window === 'undefined' || !slug) return;

  const config = getSupabaseConfig();

  if (!config) return;

  const viewedRaw = window.sessionStorage.getItem(VIEWED_STORAGE_KEY);
  const viewedSlugs = new Set<string>(viewedRaw ? JSON.parse(viewedRaw) as string[] : []);

  if (viewedSlugs.has(slug)) {
    return;
  }

  const visitorContext = getVisitorContext();

  const response = await fetch(`${config.supabaseUrl}/functions/v1/record-blog-view`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.supabaseAnonKey}`,
    },
    body: JSON.stringify({
      slug,
      sessionId: visitorContext?.sessionId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to record blog article view');
  }

  viewedSlugs.add(slug);
  window.sessionStorage.setItem(VIEWED_STORAGE_KEY, JSON.stringify([...viewedSlugs]));
};

export const mergeBlogPostsWithViews = (posts: BlogPost[], counts: Record<string, number>) =>
  posts.map((post) => ({
    ...post,
    views: counts[post.slug] ?? post.views,
  }));
