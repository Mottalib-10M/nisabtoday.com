/**
 * One page = ONE content file (CONTRIBUTING-PAGES.md): `src/content/guides/<id>.ts` (GuideDef) carries the English
 * text and, for the pages that weigh in Arabic, the Arabic text. Routes, menus, footer, sitemap, hreflang, schemas
 * and internal links read these files alone.
 */
import type { Kit } from './kit';
import type { Lang } from './format';

export interface FAQ { q: string; a: string }
export interface MiniOpts { /** title */ t?: string; /** ids of the fields shown */ p?: string[]; /** default values */ d?: Record<string, number | string>; /** link text */ c?: string }

export interface Helpers extends Kit {
  lang: Lang;
  /** Internal link by page id, in the language of the page. Unknown id = failed test. */
  a: (id: string, text: string) => string;
  /** Table; numbers are formatted, strings are inserted as HTML. */
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Link to a source of params-2026.json (key), with optional text. */
  src: (key: string, text?: string) => string;
  /** Link to any official URL already read. */
  ext: (url: string, text: string) => string;
  /** Ruled note. */
  box: (title: string, html: string) => string;
  /** Inline mini-simulator built on a calculator of tool-specs.ts: `${h.mini('gold', { t, p: ['g'], d: { k: 21 } })}`. */
  mini: (kind: string, opts?: MiniOpts) => string;
}

export type Group = 'zakat' | 'assets' | 'country' | 'fitr' | 'inheritance';

export interface PageText {
  /** URL segment, lowercase and dashes, no year (latin letters for Arabic pages too). */
  slug: string;
  nav: string; card: string;
  /** 50 to 60 characters, key term first, year included (RECETTE §11). */
  title: string;
  /** 150 to 160 characters, year included. */
  description: string;
  h1: string; intro: string;
  /** ONE paragraph of 120 words or more: the direct answer with the figures (RECETTE §21). */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
}
export interface GuideDef {
  id: string; group: Group; order: number;
  /** Calculator at the top: a key of tool-specs.ts. */
  tool: string;
  /** Default values of that calculator for this page. */
  toolArg?: Record<string, number | string>;
  related: string[];
  /** Keys of params-2026.json > sources. */
  sources: string[];
  en: PageText;
  ar?: PageText;
}
export const defineGuide = (p: GuideDef): GuideDef => p;
