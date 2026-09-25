import { basePath } from './routes';

export type AppRoute =
  | { name: 'home' }
  | { name: 'property'; slug: string }
  | { name: 'design-system' };

/**
 * Minimal pathname matcher until a router library is introduced.
 * Unknown paths fall back to the homepage (hosting rewrites every path to index.html).
 */
export function matchRoute(pathname: string): AppRoute {
  const path = (pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname).replace(/\/$/, '');

  if (path === '/design-system') return { name: 'design-system' };

  const property = /^\/properties\/([a-z0-9-]+)$/.exec(path);
  if (property?.[1]) return { name: 'property', slug: property[1] };

  return { name: 'home' };
}
