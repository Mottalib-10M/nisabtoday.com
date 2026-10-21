/** Writing tools (`Helpers`) passed to the body of every page, bound to its language. */
import { route, hasRoute, ROUTES } from '../i18n/routes';
import type { Helpers, MiniOpts } from './page-types';
import { formatNumber, type Lang } from './format';
import { makeKit } from './kit';
import P from '../data/params-2026.json';
import { PLANNED_IDS } from './planned';

const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
type Src = { url: string; label: { en: string; ar: string } };
const EXTRA = import.meta.glob<{ default: Record<string, Src> }>('../data/sources-*.json', { eager: true });
/** Sources of params-2026.json, plus the files src/data/sources-*.json (one per writer, merged here; a key may not repeat). */
const RAW: Record<string, Src> = { ...(P as unknown as { sources: Record<string, Src> }).sources };
for (const [f, m] of Object.entries(EXTRA)) for (const [k, v] of Object.entries(m.default)) { if (RAW[k]) throw new Error(`${f}: source key ${k} already exists`); RAW[k] = v; }
export const SOURCES: Record<string, { url: string; label: string }> = Object.fromEntries(Object.entries(RAW).map(([k, v]) => [k, { url: v.url, label: v.label.en }]));
export const sourceOf = (key: string, lang: Lang) => { const s = RAW[key]; if (!s) throw new Error(`Unknown source ${key}`); return { name: s.label[lang] ?? s.label.en, url: s.url }; };
export function table(headers: string[], rows: Array<Array<string | number>>, caption?: string, align: Array<'l' | 'r'> = [], lang: Lang = 'en') {
  const al = (i: number) => (align[i] === 'r' ? 'text-end' : 'text-start');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-start text-sm text-navy-700">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 font-semibold text-navy-900 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumber(c, 0, lang)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
export const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
export const box = (title: string, html: string) => `<aside class="boxnote not-prose"><p class="boxnote-title">${title}</p><div class="text-navy-800">${html}</div></aside>`;
export const mini = (kind: string, arg?: MiniOpts) => `<!--mini:${kind}${arg === undefined ? '' : `|${Buffer.from(JSON.stringify(arg)).toString('base64')}`}-->`;
export function helpers(lang: Lang = 'en'): Helpers {
  const link = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (process.env.VITEST && !PLANNED_IDS.has(id)) throw new Error(`Unknown page id in link: ${id}`); return text; }
    if (lang === 'ar' && !hasRoute(id, 'ar') && process.env.VITEST && !PLANNED_IDS.has(`ar:${id}`)) throw new Error(`Arabic page links to a page with no Arabic version: ${id}`);
    return `<a href="${route(id, hasRoute(id, lang) ? lang : 'en')}">${text}</a>`;
  };
  const src = (key: string, text?: string) => { const s = sourceOf(key, lang); return ext(s.url, text ?? s.name); };
  return { ...makeKit(lang), lang, a: link, table: (hd, rows, cap, al) => table(hd, rows, cap, al, lang), src, ext, box, mini };
}
