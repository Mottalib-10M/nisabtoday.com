/**
 * Hijri dates with the Umm al-Qura calendar of the browser (Intl, `islamic-umalqura`). The calendar is computed,
 * not sighted: a country that follows the moon sighting can start a month one day earlier or later.
 */
export interface HDate { y: number; m: number; d: number }
const ISO = (t: number) => new Date(t).toISOString().slice(0, 10);
const DAY = 86_400_000;
const fmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' });
export function toHijri(iso: string): HDate {
  const parts = fmt.formatToParts(new Date(`${iso}T12:00:00Z`));
  const g = (t: string) => parseInt(parts.find((p) => p.type === t)!.value, 10);
  return { y: g('year'), m: g('month'), d: g('day') };
}
const before = (a: HDate, b: HDate) => a.y < b.y || (a.y === b.y && (a.m < b.m || (a.m === b.m && a.d < b.d)));
/** First Gregorian day whose Hijri date is on or after `h`. */
export function fromHijri(h: HDate, near: string): string {
  let t = Date.parse(`${near}T12:00:00Z`) - 40 * DAY;
  for (let k = 0; k < 120; k++, t += DAY) if (!before(toHijri(ISO(t)), h)) return ISO(t);
  throw new Error('date out of range');
}
/** One lunar year (hawl) after a Gregorian date: same Hijri day, next Hijri year. */
export function hawlEnd(startIso: string): { end: string; days: number; hStart: HDate; hEnd: HDate } {
  const hs = toHijri(startIso);
  const target = { y: hs.y + 1, m: hs.m, d: hs.d };
  const end = fromHijri(target, ISO(Date.parse(`${startIso}T12:00:00Z`) + 354 * DAY));
  return { end, days: Math.round((Date.parse(end) - Date.parse(startIso)) / DAY), hStart: hs, hEnd: toHijri(end) };
}
/** First day of a Hijri month (Umm al-Qura), e.g. Ramadan 1448 = { y: 1448, m: 9 }. */
export const monthStart = (y: number, m: number, near: string) => fromHijri({ y, m, d: 1 }, near);
export const HIJRI_MONTHS = {
  en: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', "Sha'ban", 'Ramadan', 'Shawwal', "Dhu al-Qa'dah", 'Dhu al-Hijjah'],
  ar: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
};
export const showHijri = (h: HDate, lang: 'en' | 'ar') => (lang === 'ar' ? `${h.d} ${HIJRI_MONTHS.ar[h.m - 1]} ${h.y} هـ` : `${h.d} ${HIJRI_MONTHS.en[h.m - 1]} ${h.y} AH`);
