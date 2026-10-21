/** Where the button of a mini-simulator leads: the first page carrying the full calculator of that kind, same language. */
import { hasRoute, route, type Locale } from '../i18n/routes';
import { pageOfTool } from './pages';
export const miniHref = (kind: string, fallback: string, lang: Locale = 'en') => { const id = pageOfTool(kind, lang); return id && hasRoute(id, lang) ? route(id, lang) : fallback; };
