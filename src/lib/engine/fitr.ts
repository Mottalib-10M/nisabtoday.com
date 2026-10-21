/** Published amounts of zakat al-fitr, fidya (per day) and kaffarah (per poor person fed), Ramadan 1447 (2026). */
import D from '../../data/fitr-1447.json';
type L = { en: string; ar: string };
export interface FitrRow { id: string; country: L; body: L; cur: string; fitr?: number; fidya?: number; kaffarah?: number; /** The body's kaffarah rate is stated for a broken fast only (not an oath). */ kaffarahFastOnly?: boolean; basis?: L; date: string; year: string; url: string; via?: L }
export const FITR: FitrRow[] = (D as unknown as { rows: FitrRow[] }).rows;
export const FITR_RETRIEVED = (D as { retrieved_at: string }).retrieved_at;
export const fitrRow = (id: string) => FITR.find((r) => r.id === id);
