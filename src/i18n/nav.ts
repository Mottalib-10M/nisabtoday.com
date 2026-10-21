import { route, hasRoute, type Locale } from './routes';
import { GUIDES, guideById } from '../lib/pages';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  en: { home: 'Zakat calculator', method: 'How we calculate', about: 'About', widget: 'Embed the calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
  ar: { home: 'حاسبة الزكاة', method: 'طريقة الحساب', about: 'من نحن', widget: 'تضمين الحاسبة', contact: 'اتصل بنا', editorial: 'السياسة التحريرية', privacy: 'الخصوصية', terms: 'الإشعار القانوني', cookies: 'ملفات تعريف الارتباط' },
};
export const GROUPS: Array<{ id: Group; label: Record<Locale, string> }> = [
  { id: 'zakat', label: { en: 'Zakat and nisab', ar: 'الزكاة والنصاب' } },
  { id: 'assets', label: { en: 'By asset', ar: 'حسب نوع المال' } },
  { id: 'country', label: { en: 'By country', ar: 'حسب البلد' } },
  { id: 'fitr', label: { en: 'Fitr, fidya, kaffarah', ar: 'الفطر والفدية والكفارة' } },
  { id: 'inheritance', label: { en: 'Inheritance', ar: 'المواريث' } },
];
export const label = (id: string, lang: Locale = 'en') => CORE[lang][id] ?? guideById(id)?.[lang]?.nav ?? guideById(id)?.en.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => GUIDES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.map((g) => ({ label: g.label[lang], links: inGroup(g.id, lang) })).filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => [link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...navCategories(lang),
  { label: lang === 'ar' ? 'عن الموقع' : 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
/** The pages people use most, from every footer. */
export const popularLinks = (lang: Locale): NavLink[] => ['nisab', 'zakat-on-gold', 'zakat-al-fitr', 'islamic-inheritance-calculator'].filter((id) => hasRouteSafe(id, lang)).map((id) => link(id, lang));
function hasRouteSafe(id: string, lang: Locale) { try { return hasRoute(id, lang); } catch { return false; } }
