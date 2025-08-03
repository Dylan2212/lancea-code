import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient(); // no need for await

  const { data: users, error } = await supabase
    .from('users')
    .select('handle, created_at')
    .eq('is_live', true);

  if (error) {
    console.error('Error fetching profiles for sitemap:', error);
    return [];
  }

  const baseUrl = 'https://lancrly.com';

  const staticPages = [
    '',
    'login',
    'confirm-email',
    'loading',
    'privacy',
    'terms',
    'noaccess',
    // add other public pages here if needed
  ];

  const staticUrls = staticPages.map((page) => ({
    url: page ? `${baseUrl}/${page}` : baseUrl,
    lastModified: new Date().toISOString(),
  }));


  const profileUrls = users.map((user) => ({
    url: `${baseUrl}/${user.handle}`,
    lastModified: user.created_at || new Date().toISOString(),
  }));

  return [...staticUrls, ...profileUrls];
}