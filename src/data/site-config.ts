/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://nisabtoday.com";
export const SITE_NAMES: Record<string, string> = {"en": "Nisab Today", "ar": "حاسبة الزكاة"};
export const LANG_TAGS: Record<string, string> = {"en": "en", "ar": "ar"};
export const OG_LOCALES: Record<string, string> = {"en": "en_GB", "ar": "ar_AR"};
export const LOCALE_TAG = 'en-GB';
export const CURRENCY = 'USD';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-21';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"en": "Independent publisher of zakat, nisab and Islamic inheritance calculators", "ar": "ناشر مستقل لحاسبات الزكاة والنصاب والمواريث"};
export const AUTHOR_DESC: Record<string, string> = {"en": "Radif Partners is an independent publisher based in France. On this site it turns the rules of zakat, zakat al-fitr, fidya, kaffarah and Islamic inheritance, as published by fiqh councils and official zakat bodies, into calculators that run in your browser. It is not a religious authority and collects no money.", "ar": "Radif Partners ناشر مستقل مقره فرنسا. يحوّل في هذا الموقع أحكام الزكاة وزكاة الفطر والفدية والكفارة والمواريث، كما تنشرها المجامع الفقهية وهيئات الزكاة الرسمية، إلى حاسبات تعمل في متصفحك. ليس جهة دينية ولا يجمع أي مال."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"en": ["Zakat on cash, gold, shares, pensions and business stock", "Gold and silver nisab", "Zakat al-fitr, fidya and kaffarah", "Islamic inheritance (faraid)"], "ar": ["زكاة المال والذهب والأسهم", "نصاب الزكاة بالذهب والفضة", "زكاة الفطر والفدية والكفارة", "علم الفرائض والمواريث"]};
export const CONTACT_EMAIL = "contact@nisabtoday.com";
export const THEME_COLOR = '#0E5A4A';
export const LOGO_SYMBOL = 'Z';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = 'G-EP59BCEW1M';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = 'z260ml70m9';
export const INDEXNOW_KEY = 'be0a2748d544b1760a37ecaef8e3aa28';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',             // ex. entreprise individuelle, SASU, GmbH, eenmanszaak
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "VAT",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];  // legalForm vide : comme les autres sites du portefeuille

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
