/** Every page id the site is meant to have, and the ones with an Arabic version ("ar:<id>"). Content tests accept links
 *  to these ids while pages are being written; the "all planned pages exist" test fails until each has its file. */
export const PLANNED_GUIDES = [
  // Zakat on wealth
  'nisab', 'zakat-al-maal', 'how-to-calculate-zakat', 'zakat-percentage', 'zakat-meaning', 'when-is-zakat-due', 'who-can-receive-zakat',
  // By asset
  'zakat-on-gold', 'zakat-on-silver', 'zakat-on-savings', 'zakat-on-shares', 'zakat-on-pension', 'zakat-on-crypto', 'zakat-on-property', 'zakat-on-business', 'zakat-on-debts',
  // By country
  'zakat-calculator-uk', 'zakat-calculator-usa', 'zakat-calculator-pakistan', 'zakat-calculator-india', 'zakat-calculator-canada', 'zakat-calculator-australia', 'zakat-calculator-south-africa', 'zakat-calculator-nigeria', 'zakat-calculator-malaysia', 'zakat-calculator-uae',
  // Ramadan
  'zakat-al-fitr', 'fitrana', 'zakat-fitrah', 'fidya', 'kaffarah', 'kaffarah-for-broken-oath',
  // Inheritance
  'islamic-inheritance-calculator', 'inheritance-share-of-wife-and-husband', 'inheritance-share-of-daughters', 'awl-and-radd',
];
export const PLANNED_AR = ['nisab', 'zakat-al-maal', 'when-is-zakat-due', 'who-can-receive-zakat', 'zakat-on-gold', 'zakat-on-shares', 'zakat-on-property', 'zakat-on-business', 'zakat-al-fitr', 'fidya', 'kaffarah', 'islamic-inheritance-calculator'];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, ...PLANNED_AR.map((id) => `ar:${id}`)]);
