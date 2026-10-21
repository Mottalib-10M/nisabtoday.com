import type { Locale } from './routes';
const en = {
  updatedOn: 'Checked on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Worked out by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Questions people ask', relatedCalculators: 'Work out next', sourcesTitle: 'Where the rules and figures come from', writtenBy: 'Worked out by',
  asOf: 'Rules and published amounts of 1447 AH (2026)', lastUpdated: 'site checked on', pricesOn: 'gold and silver prices of',
  footerValidated: 'Sources: Qur’an and hadith collections, published fatwas and official zakat bodies; gold and silver from gold-api.com; exchange rates from the ECB and ExchangeRate-API (rates by Exchange Rate API)',
  footerBrowser: 'Computed in your browser · no account, no e-mail · no donation asked, no charity promoted',
  footerDisclaimer: 'Independent site published by Radif Partners, a company based in France. It is not a religious authority, a zakat body or a charity, and it collects nothing. The calculations follow the published rules and do not constitute a fatwa; when in doubt about your own case, ask a scholar you trust.',
  footerPopular: 'Most used',
  notFound: 'This page does not exist. The calculator on the home page counts your cash, gold, shares and pension against the nisab of the day, in 40 currencies.',
  readMore: 'Read the full answer',
  estimate: 'The calculation follows the rules published by the sources cited on each page, with the spot price of gold and silver of the day. Where scholars differ, both results are shown and the choice is yours; for a case of your own, ask a scholar you trust. Nothing here asks for a donation or points to a charity.',
  langName: 'English', otherLang: 'العربية',
};
const ar: typeof en = {
  updatedOn: 'رُوجع في', editorialPolicy: 'السياسة التحريرية', contactLabel: 'اتصل بنا', reviewedBy: 'إعداد',
  skipToContent: 'انتقل إلى المحتوى', mainNav: 'القائمة الرئيسية', breadcrumbLabel: 'مسار التنقل', breadcrumbHome: 'الرئيسية', menuOpen: 'فتح القائمة',
  faqTitle: 'أسئلة يطرحها الناس', relatedCalculators: 'احسب أيضًا', sourcesTitle: 'مصادر الأحكام والأرقام', writtenBy: 'إعداد',
  asOf: 'أحكام ومبالغ معلنة لعام 1447 هـ (2026)', lastUpdated: 'روجع الموقع في', pricesOn: 'أسعار الذهب والفضة بتاريخ',
  footerValidated: 'المصادر: القرآن الكريم وكتب الحديث والفتاوى المنشورة وهيئات الزكاة الرسمية؛ الذهب والفضة من gold-api.com؛ أسعار الصرف من البنك المركزي الأوروبي وExchangeRate-API',
  footerBrowser: 'الحساب في متصفحك · بلا حساب ولا بريد إلكتروني · لا نطلب تبرعًا ولا نروّج لجمعية',
  footerDisclaimer: 'موقع مستقل تنشره شركة Radif Partners ومقرها فرنسا. ليس جهة دينية ولا هيئة زكاة ولا جمعية خيرية، ولا يجمع أي مال. يتبع الحساب الأحكام المنشورة، ونتائجه تقدير لا فتوى، وعند الشك في حالتك اسأل عالمًا تثق به.',
  footerPopular: 'الأكثر استخدامًا',
  notFound: 'هذه الصفحة غير موجودة. الحاسبة في الصفحة الرئيسية تقارن نقدك وذهبك وأسهمك وتقاعدك بنصاب اليوم، بأربعين عملة.',
  readMore: 'اقرأ الجواب كاملًا',
  estimate: 'يتبع الحساب الأحكام التي تنشرها المصادر المذكورة في كل صفحة، بسعر الذهب والفضة الفوري لليوم. وحيث اختلف العلماء نعرض النتيجتين والاختيار لك؛ ولحالتك الخاصة اسأل عالمًا تثق به. لا شيء هنا يطلب تبرعًا أو يحيل إلى جمعية.',
  langName: 'العربية', otherLang: 'English',
};
export function t(lang: Locale) { return lang === 'ar' ? ar : en; }
