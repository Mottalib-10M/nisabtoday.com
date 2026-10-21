/** Shared pieces of the calculators: result card, breakdown rows, toggles, share link. */
import { useState, type ReactNode } from 'react';
import type { Lang } from '../../lib/format';

export function ResultCard({ label, value, sub, children }: { label: string; value: string; sub?: ReactNode; children?: ReactNode }) {
  return (
    <div data-resultat aria-live="polite" className="rounded-lg border border-accent-200 bg-accent-50 p-4 sm:p-5">
      <p className="text-sm font-medium text-navy-700">{label}</p>
      <p className="tabular-nums mt-1 font-serif text-[2.2rem] font-bold leading-tight text-navy-900"><bdi>{value}</bdi></p>
      {sub && <p className="mt-1 text-sm text-navy-700">{sub}</p>}
      {children}
    </div>
  );
}

export function Rows({ rows, total }: { rows: Array<[string, string, number?]>; total?: [string, string] }) {
  const max = Math.max(1, ...rows.map((r) => r[2] ?? 0));
  return (
    <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-accent-100">
      {rows.map(([l, v, w]) => (
        <tr key={l}><td className="py-1.5 pe-3 text-navy-700">{l}{w !== undefined && w > 0 && <span aria-hidden="true" className="mt-1 block h-1 rounded bg-accent-500/70" style={{ width: `${Math.max(3, (w / max) * 100)}%` }} />}</td><td className="tabular-nums py-1.5 text-end align-top text-navy-900"><bdi>{v}</bdi></td></tr>
      ))}
      {total && <tr><td className="pt-2 font-semibold text-navy-900">{total[0]}</td><td className="tabular-nums pt-2 text-end font-semibold text-navy-900"><bdi>{total[1]}</bdi></td></tr>}
    </tbody></table>
  );
}

/** Two to four options filling the whole frame (RECETTE §10.3). */
export function Choice<T extends string>({ id, label, value, options, onChange }: { id: string; label: string; value: T; options: Array<{ value: T; label: string }>; onChange: (v: T) => void }) {
  return (
    <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
      <span id={`${id}-l`} className="mb-1 block text-sm font-medium text-navy-700">{label}</span>
      <div role="group" aria-labelledby={`${id}-l`} className="grid min-h-12 grid-flow-col auto-cols-fr overflow-hidden rounded-lg border border-navy-300">
        {options.map((o) => (
          <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}
            className={`h-full px-2 py-1 text-sm font-medium leading-tight ${value === o.value ? 'bg-accent-700 text-white' : 'bg-white text-navy-700 hover:bg-navy-50'}`}>{o.label}</button>
        ))}
      </div>
    </div>
  );
}

const SHARE = {
  en: { copied: 'Link copied', copy: 'Copy share link', print: 'Print', how: 'How this is computed' },
  ar: { copied: 'نُسخ الرابط', copy: 'نسخ رابط المشاركة', print: 'طباعة', how: 'طريقة الحساب' },
};
export function ShareRow({ methodHref, note, lang = 'en' }: { methodHref?: string; note?: string; lang?: Lang }) {
  const [copied, setCopied] = useState(false);
  const s = SHARE[lang];
  const copy = () => { try { navigator.clipboard?.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* no clipboard */ } };
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-600">
      <button type="button" onClick={copy} className="underline hover:text-navy-900">{copied ? s.copied : s.copy}</button>
      <button type="button" onClick={() => window.print()} className="underline hover:text-navy-900">{s.print}</button>
      {methodHref && <a href={methodHref} className="underline hover:text-navy-900">{s.how}</a>}
      {note && <span>{note}</span>}
    </div>
  );
}
