import { MetadataRoute } from 'next'
import { getUser } from './(auth)/actions'


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {supabase} = await getUser()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  const staticRoutes = [
    '/',
    '/about',
    '/ask-for-help',
    '/contact',
    '/dmca',
    '/privacy-policy',
    '/terms-of-service',
    '/books',
    '/lists',
    '/lists/new',
    '/profile',
    '/sign-in',
    '/sign-up',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const { data: lists, error } = await supabase.from('book_lists').select('id');

  if (error) {
    console.error('Error fetching lists for sitemap:', error);
    return staticRoutes;
  }



  const listRoutes = lists.map(({ id }) => ({
    url: `${baseUrl}/lists/${id}`,
    lastModified: new Date(),
  }));

  const { data: books, error:bookError } = await supabase.from('book_lists').select('id');

  if (bookError) {
    console.error('Error fetching books for sitemap:', error);
    return [...staticRoutes, ...listRoutes];
  }

  const bookRoutes = books.map(({ id }) => ({
    url: `${baseUrl}/books/${id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...listRoutes, ...bookRoutes];
}
