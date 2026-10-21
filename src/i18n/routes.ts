import { makeRouter, type RouteDef } from './routes-core';
import { GUIDES } from '../lib/pages';
/** English first (worldwide), Arabic for the pages that weigh in Arabic (RECETTE §3). */
export const LOCALES = ['en', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const dirOf = (l: Locale) => (l === 'ar' ? 'rtl' : 'ltr');
const R = (id: string, slug: string, noindex = false): RouteDef<Locale> => ({ id, paths: { en: `/en/${slug}/`, ar: `/ar/${slug}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { en: '/en/', ar: '/ar/' } },
  R('method', 'method'),
  R('about', 'about'),
  R('widget', 'widget', true),
  R('contact', 'contact', true),
  R('editorial', 'editorial-policy', true),
  R('privacy', 'privacy', true),
  R('terms', 'legal-notice', true),
  R('cookies', 'cookies', true),
];
const G = (p: (typeof GUIDES)[number]): RouteDef<Locale> => ({ id: p.id, paths: { en: `/en/${p.en.slug}/`, ...(p.ar ? { ar: `/ar/${p.ar.slug}/` } : {}) } });
export const ROUTES: RouteDef<Locale>[] = [CORE[0], ...GUIDES.map(G), ...CORE.slice(1)];
export const { NOINDEX_PATHS, route, hasRoute, altPaths } = makeRouter(LOCALES, ROUTES);
