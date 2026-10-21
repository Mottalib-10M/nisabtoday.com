/** llms.txt (RECETTE §21), generated from the page registry. */
import { GUIDES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route, hasRoute } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`, '',
    `> Zakat calculator in English and Arabic. The nisab of the day in 40 currencies from the spot price of gold and silver (85 g of gold, 595 g of silver, or the 87.48 g and 612.32 g of Pakistan's 1980 Ordinance), refreshed daily. Zakat on cash, gold, silver, shares, pensions, crypto, rental property, business stock and debts at 2.5 % for a lunar year or the day-prorated solar rate of the Saudi zakat regulations; both amounts shown where the schools of law differ (worn jewellery, locked pensions, shares held for dividends, debts). Zakat al-fitr, fidya and kaffarah with the amounts published for Ramadan 1447 by fatwa councils and official zakat bodies. Islamic inheritance shares with 'awl, radd, the 'umariyya and mushtaraka cases, tested on published answers. Independent site published by Radif Partners: not a religious authority, a zakat body or a charity; no donation asked. Last updated ${LAST_UPDATED}.`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label.en}`, ...GUIDES.filter((p) => p.group === g.id).map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}${hasRoute(p.id, 'ar') ? ` (Arabic: ${SITE_URL}${route(p.id, 'ar')})` : ''}`), '']),
    '## About', `- [How we calculate](${SITE_URL}${route('method', 'en')})`, `- [About](${SITE_URL}${route('about', 'en')})`, `- [العربية](${SITE_URL}${route('home', 'ar')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
