# Research notes — zakat + faraid rules (raw quotes), compiled 2026-10-21

Method: every quote below was read in the fetched page text (curl / API / WebFetch) during this session.
Note on sunnah.com: the site returns a Cloudflare challenge (HTTP 403) to curl/WebFetch, so hadith text was verified
through the fawazahmed0 hadith-api mirror (cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/{eng,ara}-bukhari/N.json),
whose numbering matches sunnah.com's Bukhari numbering. The sunnah.com URLs are given for citation; open them in a browser once to confirm.
Quran text: api.quran.com v4 (translation id 20 = Saheeh International), cite as https://quran.com/<surah>/<ayah>.

## QURAN

### 9:60 — 8 categories of zakat recipients — https://quran.com/9/60
AR: إِنَّمَا ٱلصَّدَقَـٰتُ لِلْفُقَرَآءِ وَٱلْمَسَـٰكِينِ وَٱلْعَـٰمِلِينَ عَلَيْهَا وَٱلْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِى ٱلرِّقَابِ وَٱلْغَـٰرِمِينَ وَفِى سَبِيلِ ٱللَّهِ وَٱبْنِ ٱلسَّبِيلِ ۖ فَرِيضَةً مِّنَ ٱللَّهِ ۗ وَٱللَّهُ عَلِيمٌ حَكِيمٌ
EN (Sahih Intl): "Zakāh expenditures are only for the poor and for the needy and for those employed for it and for bringing hearts together [for Islām] and for freeing captives [or slaves] and for those in debt and for the cause of Allāh and for the [stranded] traveler - an obligation [imposed] by Allāh. And Allāh is Knowing and Wise."

### 2:184 — fidya — https://quran.com/2/184
AR: ... وَعَلَى ٱلَّذِينَ يُطِيقُونَهُۥ فِدْيَةٌ طَعَامُ مِسْكِينٍ ...
EN: "And upon those who are able [to fast, but with hardship] - a ransom [as substitute] of feeding a poor person [each day]."

### 5:89 — oath kaffarah — https://quran.com/5/89
AR: فَكَفَّـٰرَتُهُۥٓ إِطْعَامُ عَشَرَةِ مَسَـٰكِينَ مِنْ أَوْسَطِ مَا تُطْعِمُونَ أَهْلِيكُمْ أَوْ كِسْوَتُهُمْ أَوْ تَحْرِيرُ رَقَبَةٍ ۖ فَمَن لَّمْ يَجِدْ فَصِيَامُ ثَلَـٰثَةِ أَيَّامٍ
EN: "So its expiation is the feeding of ten needy people from the average of that which you feed your [own] families or clothing them or the freeing of a slave. But whoever cannot find [or afford it] - then a fast of three days [is required]."

### 6:141 — "give its due on the day of its harvest" — https://quran.com/6/141
AR: كُلُوا۟ مِن ثَمَرِهِۦٓ إِذَآ أَثْمَرَ وَءَاتُوا۟ حَقَّهُۥ يَوْمَ حَصَادِهِۦ
EN: "Eat of [each of] its fruit when it yields and give its due [zakāh] on the day of its harvest."

### 4:11, 4:12, 4:176 — inheritance shares — https://quran.com/4/11 , /4/12 , /4/176
4:11 EN: "for the male, what is equal to the share of two females. But if there are [only] daughters, two or more, for them is two thirds of one's estate. And if there is only one, for her is half. And for one's parents, to each one of them is a sixth of his estate if he left children. But if he had no children and the parents [alone] inherit from him, then for his mother is one third. And if he had brothers [and/or sisters], for his mother is a sixth"
4:11 AR: لِلذَّكَرِ مِثْلُ حَظِّ ٱلْأُنثَيَيْنِ ۚ فَإِن كُنَّ نِسَآءً فَوْقَ ٱثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ ۖ وَإِن كَانَتْ وَٰحِدَةً فَلَهَا ٱلنِّصْفُ ۚ وَلِأَبَوَيْهِ لِكُلِّ وَٰحِدٍ مِّنْهُمَا ٱلسُّدُسُ مِمَّا تَرَكَ إِن كَانَ لَهُۥ وَلَدٌ ۚ فَإِن لَّمْ يَكُن لَّهُۥ وَلَدٌ وَوَرِثَهُۥٓ أَبَوَاهُ فَلِأُمِّهِ ٱلثُّلُثُ ۚ فَإِن كَانَ لَهُۥٓ إِخْوَةٌ فَلِأُمِّهِ ٱلسُّدُسُ
4:12 EN: "And for you is half of what your wives leave if they have no child. But if they have a child, for you is one fourth ... And for them [i.e., the wives] is one fourth if you leave no child. But if you leave a child, then for them is an eighth ... And if a man or woman leaves neither ascendants nor descendants but has a brother or a sister, then for each one of them is a sixth. But if they are more than two, they share a third"
4:176 EN: "If a man dies, leaving no child but [only] a sister, she will have half of what he left. ... But if there are two sisters [or more], they will have two thirds of what he left. If there are both brothers and sisters, the male will have the share of two females."

## HADITH (Sahih al-Bukhari)

### Bukhari 1503 — zakat al-fitr — https://sunnah.com/bukhari:1503
EN: "Allah's Messenger (ﷺ) enjoined the payment of one Sa' of dates or one Sa' of barley as Zakat-ul-Fitr on every Muslim slave or free, male or female, young or old, and he ordered that it be paid before the people went out to offer the `Id prayer."
AR: فَرَضَ رَسُولُ اللَّهِ صلى الله عليه وسلم زَكَاةَ الْفِطْرِ صَاعًا مِنْ تَمْرٍ، أَوْ صَاعًا مِنْ شَعِيرٍ عَلَى الْعَبْدِ وَالْحُرِّ، وَالذَّكَرِ وَالأُنْثَى، وَالصَّغِيرِ وَالْكَبِيرِ مِنَ الْمُسْلِمِينَ، وَأَمَرَ بِهَا أَنْ تُؤَدَّى قَبْلَ خُرُوجِ النَّاسِ إِلَى الصَّلاَةِ
(Also 1506 Abu Sa'id: "We used to give one Sa' of meal or one Sa' of barley or one Sa' of dates, or one Sa' of cottage cheese or one Sa' of Raisins" — https://sunnah.com/bukhari:1506)

### Bukhari 1936 — Ramadan intercourse kaffarah — https://sunnah.com/bukhari:1936
EN: "\"I had sexual intercourse with my wife while I was fasting.\" Allah's Messenger (ﷺ) asked him, \"Can you afford to manumit a slave?\" He replied in the negative. ... \"Can you fast for two successive months?\" He replied in the negative. ... \"Can you afford to feed sixty poor persons?\""
AR: هَلْ تَجِدُ رَقَبَةً تُعْتِقُهَا ... فَهَلْ تَسْتَطِيعُ أَنْ تَصُومَ شَهْرَيْنِ مُتَتَابِعَيْنِ ... فَهَلْ تَجِدُ إِطْعَامَ سِتِّينَ مِسْكِينًا

### Bukhari 1483 — ushr 10% / 5% — https://sunnah.com/bukhari:1483
EN: "On a land irrigated by rain water or by natural water channels or if the land is wet due to a near by water channel Ushr (i.e. one-tenth) is compulsory (as Zakat); and on the land irrigated by the well, half of an Ushr (i.e. one-twentieth) is compulsory"
AR: فِيمَا سَقَتِ السَّمَاءُ وَالْعُيُونُ أَوْ كَانَ عَثَرِيًّا الْعُشْرُ، وَمَا سُقِيَ بِالنَّضْحِ نِصْفُ الْعُشْرِ

### Bukhari 1447 / 1405 — nisab 5 awaq silver, 5 awsuq crops — https://sunnah.com/bukhari:1447
AR: لَيْسَ فِيمَا دُونَ خَمْسِ ذَوْدٍ صَدَقَةٌ مِنَ الإِبِلِ، وَلَيْسَ فِيمَا دُونَ خَمْسِ أَوَاقٍ صَدَقَةٌ، وَلَيْسَ فِيمَا دُونَ خَمْسَةِ أَوْسُقٍ صَدَقَةٌ
EN (1405): "No Zakat is due on property mounting to less than five Uqiyas (of silver), and no Zakat is due on less than five camels, and there is no Zakat on less than five Wasqs." (translator's note: "A Wasqs equals 60 Sa's")

### Bukhari 6736 — daughter + son's daughter + sister — https://sunnah.com/bukhari:6736
EN: "one-half is for daughter, and one-sixth for the son's daughter, i.e. both shares make two-thirds of the total property; and the rest is for the sister."
AR: لِلاِبْنَةِ النِّصْفُ، وَلاِبْنَةِ ابْنٍ السُّدُسُ تَكْمِلَةَ الثُّلُثَيْنِ، وَمَا بَقِيَ فَلِلأُخْتِ


## PART A / B — OFFICIAL BODIES

### Jordan — General Iftaa' Department (aliftaa.jo), fatwa #854 — gold nisab 85 g
URL: https://www.aliftaa.jo/en-fatwas/854  (EN mirror of the same fatwa also at islamqa.org/shafii/darul-iftaa-jordan/226525 — do NOT cite the mirror)
Quote: "Those who estimated the weight of the old gold dinar at (4.25 grams) said: The Nisaab for gold is the product of multiplying twenty by (4.25 grams), and that is (85 grams). This is the view of most modern scholars and it is also adopted by the General Iftaa` Department of Jordan."
Quote: "those who estimated the weight of the old gold dinar at (4.8 grams) said: The Nisaab for gold is the product of multiplying twenty by (4.8 grams), and that is (96 grams). This is the Nisaab adopted in the Shafie book [Al-Fiqh al-Manhaji]"
Quote (question): "School books state that the Nisaab for gold is (85 grams) of pure gold"

### Punjab Zakat & Ushr Department (Government of the Punjab, Pakistan)
FAQ URL: https://zakat.punjab.gov.pk/faq   (same FAQ block also on homepage https://zakat.punjab.gov.pk/)
- "Zakat & Ushr system was introduced in 1980."
- "Nisab of Zakat for the year 1446-47 A.H is Rs. 503,529"  (heading on FAQ page reads "What is Nisab of Zakat for the year 1445-46 A.H( 2026) ?" — inconsistent year label on the site itself)
- "When Zakat is deducted? ... 1st of Ramdan-ul-Mubarak (every year) on PLS Accounts."
- "Which are Zakat deducting agencies? ... The banks, Offices, Centers or Financial Institutions."
- "Who is eligible to receive Zakat? ... A Muslim citizen of Pakistan living below poverty line."
- "Are non-Muslims eligible for Zakat? ... No, non-Muslims are not eligible to receive Zakat."
- The site does NOT state the nisab basis in tolas/grams on these pages.
Calculator URL: https://zakat.punjab.gov.pk/zakat-calculator
- "ZAKAT ON GOLD (2.5%)" with rows "24 Carat Gold/Jewelry", "22 Carat Gold/Jewelry", "18 Carat Gold/Jewelry" (i.e. jewellery is included — Hanafi practice)
- "ZAKAT ON SILVER (2.5%) Include Household Silver Utensils, Artefacts, and Jewelery. For Utensils, usually the silver is 90% pure so take 90% of the total weight"
- "Value of Shares (stocks) including Dividends. Take their market value on the date of calculation"
- "Optional Provident Fund balance" (listed as zakatable)
- "Landed Property held as an Investment / Business (Estimate the current Maket Value)"
- "Zakat on Rentals Coming from Property (Any amount remaining after Deducting for all expenses)"
- Business: "Value of Saleable Stock", "Amount Receivable from Credit Sales", "LESS: Amount Payable to Suppliers", "LESS: Bad Debts"
- "GENERAL LIABILITIES - You need to deduct your direct Payables or Liabilities which have not been deducted earlier - Usage of the loan should have been on Zakatable Wealth only."
- "ZAKAT ON PRECIOUS STONES (2.5%) ... add them to the Estimated Value Column if they are purchased for commercial purpose."
- Disclaimer: "Zakat and Ushr department cannot guarantee the correctness of calculations made via this calculator."

### PPZ-MAIWP (Pusat Pungutan Zakat, Majlis Agama Islam Wilayah Persekutuan, Malaysia) — www.zakat.com.my
(Lembaga Zakat Selangor zakatselangor.com.my refused the connection from this machine — ECONNREFUSED — so LZS could not be read; PPZ-MAIWP used instead.)

Nisab archive: https://www.zakat.com.my/info-zakat/arkib-nisab-tahunan/
- "2026 Nisab Emas RM33,996.00 Nisab Perak RM 3,278 Harga Emas per gram RM399.95 Harga Perak per gram RM 5.51"  (33,996 / 399.95 = 85 g ; 3,278 / 5.51 = 595 g)
- "2025 29,740.00 349.88 2,466.00 4.14"
Gold: https://www.zakat.com.my/info-zakat/jenis-jenis-zakat/zakat-emas/
- "Jika jumlah berat emas yang disimpan itu menyamai atau melebihi nisab 85 gram , serta melepasi tempoh masa 12 bulan atau setahun (cukup haul ), maka wajib dikeluarkan zakat keatasnya sebanyak 2.5 peratus (%)."
- "Tiada wajib atas kamu sesuatu pun iaitu pada emas sehingga ada 20 dinar (85 gram)"
- WORN JEWELLERY (Shafi'i + 'urf threshold): "Hukum asal sebarang bentuk pemakaian tidak diwajibkan zakat. ... Namun barang perhiasan tetap diwajibkan zakat sekiranya pemakaiannya terlalu banyak sehingga berlebihan dan melampaui kadar yang biasa (uruf) dipakai."
- "Wilayah Persekutuan telah menetapkan kadar uruf emas perhiasan sebanyak 800 gram . Justeru sebarang pemakaian yang berulang ataupun sekali dalam tempoh setahun melebihi 800 gram wajib dikeluarkan zakat ke atasnya."  Worked example: 900 g worn, 'urf 800 g → zakat on 100 g.
- Stored (unworn) jewellery: "Ianya termasuk barang kemas yang tidak dipakai kerana sudah rosak atau lama. Ianya juga termasuk barang perhiasan yang dimiliki oleh lelaki" → zakatable at 85 g nisab.
- Gold investment fatwa (WP 87th meeting, 27 Aug 2014): "Zakat wajib dikenakan terhadap emas pelaburan fizikal, emas akaun (passbook) dan emas maya (forex)."
Silver: https://www.zakat.com.my/info-zakat/jenis-jenis-zakat/zakat-perak/
- "nisab zakat perak ialah 200 dirham. Menurut Dr. Yusuf Al-Qaradawi, fuqaha telah bersetuju bahawa 200 dirham adalah bersamaan 595 gram ."
Savings: https://www.zakat.com.my/info-zakat/jenis-jenis-zakat/zakat-wang-simpanan/
- "Nisab zakat wang simpanan sama bersamaan nilai 85 gram emas Zakat dikenakan sebanyak 2.5% ke atas jumlah baki terakhir dalam tempoh setahun simpanan apabila cukup nisab dan haulnya"  → CASH NISAB = GOLD (85 g)
EPF / KWSP (retirement): https://www.zakat.com.my/info-zakat/jenis-jenis-zakat/zakat-kwsp/
- "simpanan di KWSP tidak boleh dikeluarkan sewenang-wenangnya seperti akaun simpanan biasa, justeru ia tidak memenuhi syarat “Sempurna Milik”."
- "Caruman KWSP diwajibkan zakat apabila dikeluarkan daripada simpanan tersebut."
- Fatwa WP 120th meeting (1 Nov 2019): "Bagi skim pengeluaran yang memenuhi syarat milk al-taam dan bukan bagi tujuan perbelanjaan hajah asliyah ... ZAKAT DIWAJIBKAN ke atas keseluruhan amaun yang boleh dikeluarkan pada kadar 2.5% tertakluk kepada nisab tanpa perlu menunggu haul."
- "Bagi skim pengeluaran untuk tujuan hajah asliyah seperti pengeluaran perumahan, pengeluaran pendidikan, pengeluaran kesihatan dan pengeluaran hilang upaya kekal mesyuarat memutuskan bahawa TIDAK DIKENAKAN zakat"
- "Nisab zakat KWSP sama seperti nisab zakat wang yang lain iaitu 85 gram emas."
Shares: https://www.zakat.com.my/info-zakat/jenis-jenis-zakat/zakat-saham/
- Fatwa WP 94th meeting (11 Nov 2015): "Kadar zakat yang wajib dikeluarkan adalah 2.5% daripada nilai pasaran saham-saham semasa yang berada dalam pemilikannya."
- "Saham yang dibeli untuk tujuan diurusniagakan atau berjangka pendek hendaklah dizakatkan dengan kadar sebanyak 2.5% daripada nilai pasaran semasa"
- "Saham yang dibeli untuk mendapat pulangan tahunan atau pemilikan jangka masa panjang hendaklah dizakatkan dengan kadar sebanyak 2.5% daripada harga saham mengikut pasaran semasa."  → PPZ: BOTH trading and long-term = 2.5% of market value (no proxy %).
- Non-compliant shares: "keuntungan ... hendaklah dilupuskan ... Manakala modal asas hendaklah dizakatkan"
- WP 111th meeting (4 Oct 2018): "penggunaan baki terakhir di penghujung haul adalah lebih menepati."
Digital assets / crypto: https://www.zakat.com.my/info-zakat/jenis-jenis-zakat/zakat-aset-digital/
- Fatwa WP 134th meeting (26-27 Oct 2021): "Apa-apa aset digital yang telah disahkan patuh Syariah, memiliki nilai dan diniagakan hendaklah dikenakan zakat perniagaan dengan perkadaran 2.5%."
- "Bagi maksud Fatwa ini, aset digital yang melebihi nisab dan genap setahun wajib dikenakan zakat."
- "Fatwa ini telah diwartakan pada 14 November 2022"
- Formula: "[ (Unit Aset Digital × Harga Semasa Aset Digital) – Kos Berkaitan ] × 2.5%"
Business: https://www.zakat.com.my/info-zakat/jenis-jenis-zakat/zakat-perniagaan/
- "Nisab adalah bersamaan dengan nilai 85 gram harga emas semasa." "Penilaian harta perniagaan adalah dengan mengambil kira keadaan perniagaan pada akhir haul."
- Working-capital method: "[Aset Semasa – Liabiliti Semasa] X % Pemilikan Saham Muslim X 2.5%"
- Athar of Maymun ibn Mihran (quoted): "bagi barang perniagaan yang ada, nilailah ia dengan matawang, begitu juga segala hutang pelangganmu yang mampu (diharap kembali) hendaklah diambilkira dan kemudian tolakkan hutangmu sendiri"
Fidyah: https://www.zakat.com.my/info-zakat/fidyah/
- "Hukum membayar fidyah adalah wajib. Ia wajib disempurnakan mengikut bilangan hari yang ditinggalkan."
- Rate used in examples (Wilayah Persekutuan): "30 hari × RM4.00 ... Jumlah Fidyah: RM120.00"
- Delayed qada past next Ramadan: "( 7 hari × RM4.00 ) × 3 Tahun" (fidyah multiplies per year of delay — Shafi'i position)
Asnaf: https://www.zakat.com.my/info-zakat/asnaf-zakat/ — lists "8 Golongan Asnaf": Fakir, Miskin, Amil, Muallaf, Al-Riqab, Al-Gharimin, Fisabilillah, Ibnu Sabil.


### Kuwait Zakat House (بيت الزكاة الكويتي, government body) — calculator
URL: https://www.zakathouse.org.kw/calculate.aspx  (read 2026-10-21)
- "للعلم بان نصاب زكاة المال اليوم 3491.80 د.ك ما يعادل قيمة 85 غرام ذهب 24 قيراط"  → cash nisab = 85 g of 24-carat gold (3491.80/85 = 41.08 KWD = the 24ct gram price shown).
- Also publishes per-share zakat amounts for Kuwaiti listed companies ("زكاة السهم ... 0.0031دينار كويتي"; "قام البنك بإخراج الزكاة عن المساهمين"; "ليس عليها زكاة") — i.e. the company-zakatable-assets (per-share) method for investors.
- Silver rows: "99.9 (الفضة النقية)", "90 (فضة العملات)", "80 (فضة المجوهرات)".

### Dar al-Ifta al-Misriyya (Egypt) — dar-alifta.org
Nisab = 85 g of 21-carat: https://www.dar-alifta.org/ar/fatwa/details/21692
- Q: "أسمع كثيرًا أن نصاب الزكاة في المال هو 85 جرامًا من الذهب عيار 21، فلماذا كان النصاب على عيار 21 وليس على عيار 18 أو 24؟"
- "تواردت نصوص الفقهاء على أن المثقال يعادل بالحسابات الحديثة 4.25 جرامات، وأن نصاب الزكاة حينئذ يقارب 85 جرامًا من الذهب"
- Shafi'i/Hanbali (pure gold): "يكون نصاب الزكاة في عيار 24 هو امتلاك قيمة 85 جرامًا، وقدر النصاب في عيار 21 هو امتلاك قيمة 97.14 جرامًا من الذهب، وقدر النصاب في عيار 18 هو امتلاك قيمة 113.33 جرامًا تقريبًا"
- Hanafi/some Maliki (alloy follows majority): "نصاب الزكاة ثابت في كل عيار من معايير الذهب وهو امتلاك قيمة 85 جرامًا من الذهب"
- "جرى العمل والفتوى في الدِّيار المصريَّة باعتبار النصاب على عيار 21" ; earlier fatwa: "الاعتبار دائمًا لوزن النصاب ذهبًا 85 جرامًا عيار 21" (فتوى رقم 12 لسنة 1984م)
Worn jewellery: https://www.dar-alifta.org/ar/fatwa/details/22484  (Mufti Nazir Ayyad)
- "لا زكاة على المرأة في الذهب الذي تملكه بقصد استعماله في التزيُّنِ به والتحلي وإن كانت ستبيع منه شيئًا عند الحاجة، وإنما تجب الزكاة فيما تملكه من الذهب بقصد محض الادخار وحفظ المال أو الاستثمار"
- Pro-zakat view: "وممن ذهب إلى وجوب الزكاة فيه: الحنفية، وقول للإمام الشافعي، ورواية عن الإمام أحمد"
- Abu Hanifa (via al-Shaybani): "ليس من ذهب ولا فضة حلي ولا غيره يبلغ ما يجب فيه الزكاة إلا وجب فيه الزكاة"
- Majority: "بينما ذهب جمهور الفقهاء من المالكية، والشافعية في الأظهر، والحنابلة في ظاهر المذهب، إلى عدم وجوب الزكاة فيه"
- Gems: "فإن كان من غير الذهب والفضة كالجواهر والياقوت واللآلئ ونحوها، فقد أجمع الفقهاء على أنه لا تجب فيها الزكاة."
Also: https://www.dar-alifta.org/ar/fatwa/details/20631 — "لا يجب على المرأة أن تخرج عنه زكاة حتى لو بلغ نصابًا وحال عليه الحول على المختار للفتوى" ; savings jewellery: "خمسة وثمانين جرامًا من الذهب عيار (21)، ومرَّ عليه عامٌ هجري كامل، وتخرج عنه ربع العشر 2.5%"
Zakat al-fitr in cash: https://www.dar-alifta.org/ar/fatwa/details/20491
- "يجوز شرعًا إخراج زكاة الفطر مالًا ولا حرج في ذلك، وهو ما نراه أوفق لمقاصد الشرع وأرفق بمصالح الخلق، وهو مذهب الحنفية"
- Sa' per majority: "قدَّرها النبي صلى الله عليه وآله وسلم بصاعٍ من تمرٍ أو شعيرٍ أو قُوتِ البلد، وهو ما مقداره 2.040 كجم -على مذهب الجمهور-، على كُلِّ نَفْسٍ من المسلمين"
- Ibn Taymiyya quoted: "وأما إخراج القيمة للحاجة أو المصلحة أو العدل فلا بأس به" ; "روايةٌ مُخَرَّجة عن الإمام أحمد"
Hanafi fitr amount: https://www.dar-alifta.org/ar/fatwa/details/11208
- "من المقرر في فقه السادة الحنفية أن مقدار زكاة الفطر : نصفُ صاعٍ من بُرٍّ، أو دقيقه، أو سَويقه، أو زبيب، أو صاع من تمر أو شعير."
- "يجزئ عنه نصف صاع عند الحنفية، وهو كيلوجرام واحد وستمائة وخمسة وعشرون جرامًا، ومن أراد أن يُخرج تمرًا أو شعيرًا فيجزئه صاع، وهو ما مقداره ثلاثة كيلوجرامات وربع الكيلو جرام." (Hanafi sa' = 3.25 kg; half sa' = 1.625 kg)
Shares held as savings: https://www.dar-alifta.org/ar/fatwa/details/12218
- "النصاب الشرعي الذي تجب فيه الزكاة هو ما يقابل قيمته بالنقود الحالية 85 جرامًا من الذهب عيار 21 ... بمقدار ربع العشر 2.5%"
- "يجب على السائل أن يخرج الزكاة من قيمة الأسهم الحالية متى حال عليه الحول مضافًا إليها الأرباح" (Dar al-Ifta: market value even for non-trading savings shares)


### International Islamic Fiqh Academy (IIFA, OIC) — iifa-aifi.org (English pages)
Res. 28 (3/4) Zakah on Company Shares (4th session, Jeddah, Feb 1988): https://iifa-aifi.org/en/32294.html
- "First: Zakāh on shares is an obligation upon their shareholders. The company must pay zakāh on their behalf if any of the following conditions are met: ..."
- "it shall pay zakāh on the assumption that the capital of all shareholders is the property of a single person"
- Long-term / income holder who cannot know company zakat: "The owner of such shares is not required to pay Zakāh on the assets of shares, but only on the dividends, which is at a rate of ¼ of 1/10 after the elapse of one year from the date of the actual reception of the dividends"
- Trading: "If, on the other hand, the shareholder has invested in shares for business purposes, then his shares are subject to Zakāh as commercial ... he shall pay Zakāh on their market value ... He will pay ¼ of 1/10 (2.5%) of their market value plus their dividends, if they yield any dividend."
Res. 121 (3/13) Zakah on Shares Owned to Earn their Income: https://iifa-aifi.org/en/32840.html
- "If the Zakāh non-paying company owns Zakāh-liable properties such as cash balances, goods for trade, and debts owed by solvent debtors; and the shareholder fails to know from the company’s accounts the exact portion ... he should make the maximum possible investigations and then pay Zakāh for the portion of the Zakāh-liable [assets]"
- "if the company has no properties liable to Zakāh ... “the shareholder should pay Zakāh on the income only and not on the principal of the shares.”"
Res. 2 (2/2) Zakah on Real Estates and Leased Non-Agricultural Lands (2nd session, 22-28 Dec 1985): https://iifa-aifi.org/en/32196.html
- "Zakāh is not due on real estate assets and leased [lands]"
- "Zakāh is due and payable on its yield, which is one-fourth of the one- tenth (2.5%), after the elapsing of the one-year period from the date of its actual receipt if all other conditions are met and no impediments"
Res. 1 (1/2) Zakah on Debts (2nd session, Dec 1985): https://iifa-aifi.org/en/32192.html
- "The Islamic schools of jurisprudence have differed clearly on the ..."
- "Zakāh of debt is due on the owner of the debt, for each year, if the debtor is solvent and giver."
- "Zakāh of debt is due on the owner of the debt, after the lapse of one year from the day of receipt if the debtor is insolvent or [procrastinating]"  (page text truncated after "insolvent or")
Res. 143 (1/16) Zakah on Restricted Accounts ... End-of-Service Benefits: https://iifa-aifi.org/en/32897.html
- Investment accounts: "Owners of investment accounts are required to pay Zakāh on the balances and profits of their accounts ... regardless of whether the accounts are long term or short- term accounts, or whether restrictions on their withdrawals are set"
- End-of-service award: "It is not obligatory for the worker or employee to pay Zakāh on such an amount throughout his service duration because during the term of his service, he does not have full ownership of the amount. If a decision is taken to calculate the amount and pay it ... the worker or employee becomes the full owner of the amount and should, therefore, include it into his Zakāh-liable assets."
- Saving award (employee+employer contribution fund, i.e. closest to a 401k/pension pot): "If it is deposited in a special account in the name of the employee or worker so that he can decide the types of investment to which the amount is to be channelled, he should add these funds to his Zakāh-liable assets and pay Zakāh on it"
- "If, instead, the amount is deposited in an account which the worker or employee has no right to control, the worker or employee should not pay Zakāh on it because he does not yet have full ownership of it. In this case, the employee or worker has to pay Zakāh for only one year at the time of receiving the amount."


### Pakistan — Zakat & Ushr Ordinance 1980 (copy hosted by Punjab Zakat & Ushr Dept)
URL: https://zakat.punjab.gov.pk/system/files/zakatushr1980.pdf  (title page: "ZAKAT & USHR ORDINANCE, 1980")
- s.2 (xva) as amended: "‘nisab’ in relation to assets liable to Zakat, except agricultural produce and animals fed free in pastures, means 612.32 grams of silver, or cash or gold, or goods for trade, or any assets liable to Zakat under Shariah, the aggregate value of which is equal to the value of 612.32 grams of silver, as notified by the Administrator- General for each Zakat year or, in the case of a person whose assets liable to Zakat consist only of gold, 87.48 grams of gold"
  → NOTE: statutory figures are 612.32 g silver (NOT 612.36) and 87.48 g gold. Mixed assets/cash → SILVER nisab; gold-only → 87.48 g.
- Ushr (s.5): "Ushr at the rate of five per cent of his share of the produce" (Pakistan levies a flat 5%, not the 10%/5% split)
- Ushr exemption: "the produce from his land is less than five wasqs (=948 Kilograms) of wheat"
- First Schedule: "If listed on the stock exchanges, 2.5% of the market value i.e. the closing rate of the Karachi Stock Exchange as on the Valuation Date." / "If not listed on the stock exchange, 2.5% of the paid-up value"
Same definitions in AJK law (Govt of Azad Jammu & Kashmir, Ordinance XLIII of 1981): https://law.gok.pk/wp-content/uploads/2023/07/The-Zakat-and-Ushr-Ordinance-1981-Ordinance-XLIII-Of-1981.pdf
- "'Nisab' ... means 612.32 grams of silver, or cash or gold, ... the aggregate value of which is equal to the value of 612.32 grams of silver, as notified by the Chief Administrator for each Zakat year or, in the case of a person whose assets liable to Zakat consist of only of gold, 87.48 grams of gold."
Punjab overview: https://zakat.punjab.gov.pk/overview
- "Zakat and Ushr Ordinance 1980 was promulgated ... The Department remained on the Concurrent List until 2010 when it was devolved under the 18th Amendment. Zakat and Ushr is now a provincial subject."
- "Zakat is compulsorily levied on 11 assets as detailed in the 1st Schedule of The Punjab Zakat and Ushr Act, 2018. Banks, companies and other financial institutions operating these assets deduct Zakat at source."
NOT FOUND: an official source for "7.5 tola = 87.48 g / 52.5 tola = 612.36 g". The tola wording appears only in non-official pages (school textbook, news). Statute uses grams (87.48 / 612.32).

### ZATCA (Saudi Arabia) — Implementing Regulations for Zakat Collection 1445H (2024)
URL: https://zatca.gov.sa/en/RulesRegulations/Documents/ZAKAT%20COLLECTION.pdf  ("Issued by His Excellency the Minister of Finance’s Decision No. (1007) and dated 19/08/1445 H")
- Article (15): "1. Zakat shall be levied at (2.5%) of Zakat Base for Hijri year."
- "2. If the Zakat Payer’s fiscal year differs from the Hijri year, Zakat shall be calculated on the actual number of days by dividing the percentage of Zakat over the number of days of Hijri year multiplied by the actual number of days of Zakat Payer’s Zakat Year as per the following equation: Percentage of Zakat = (2.5% ÷ number of days of the Hijri year) x number of days of the fiscal year of the Zakat Payer"
- "3. The fiscal period less than (354) days as of the activity commencement shall be subject to Zakat collection."
- Article (21) base: "the Zakat Payer holding legal accounts shall calculate the Zakat base by adding the additionality contained in Article (23) including the deduction items contained in Article (26)"
FAQ guideline: https://zatca.gov.sa/en/HelpCenter/guidelines/Documents/FAQ's.pdf
- "Zakat is calculated for the calendar year by dividing two and a half percent (2.5%) by the number of days of Hijri year (354 days) multiplied by number of days of the Zakat Payer’s calendarYear."
- "Excluding adjusted net profit, it is subject to two and a half percent (2.5%) for the period whether short or long."
Computation: 2.5% × 365/354 = 2.57768% (366-day year: 2.58475%). ZATCA publishes the formula, NOT a fixed "2.5775%" or "2.577%" number.

### AAOIFI Shari'ah Standard 35 (Zakah)
NOT READ: the SS35 text is not freely available online (aaoifi.com only had an exposure draft of the accounting standard F5/2019, which says rate rules are "covered in paragraphs 3/2 and 3/3 of AAOIFI SS 35"). The 2.577% solar-year attribution to AAOIFI was only found on charity pages (NZF), which are excluded. → Do not cite AAOIFI for 2.577% unless you get the standard.

### Egypt Dar al-Ifta — Bitcoin (2017-12-28): https://www.dar-alifta.org/ar/fatwa/details/14139
- "ترى أمانة الفتوى بدار الإفتاء المصرية أن تداول هذه العملات والتعامل من خلالها بالبيعِ والشراءِ والإجارةِ وغيرها حرامٌ شرعًا"
(No Dar al-Ifta fatwa on zakat of crypto found.)

### Islamweb (Qatar Ministry of Awqaf) — debts you owe, fidya
Debts (Hanafi + majority deduct; Shafi'i new view does not): https://www.islamweb.net/ar/fatwa/47139/
- "فجمهور أهل العلم على أن الدين يمنع وجوب الزكاة في الأموال الباطنة، وهي الذهب والفضة والنقود، وعروض التجارة، وهذا مذهب أبي حنيفة ومالك والشافعي في القديم و أحمد ، فإذا كان الدين يستغرق النصاب أو ينقصه فلا زكاة في هذه الأموال"
- "وذهب الشافعي في الجديد من قوليه إلى أن الدين لا يمنع وجوب الزكاة"
- "فإن كان الدين لا ينقص النصاب خصم من مال الزكاة بقدره وزكي الباقي"
https://www.islamweb.net/ar/fatwa/64373/
- "وذهب الحنفية إلى أن الدين يمنع الزكاة في الأموال الباطنة وفي السوائم، أما ما وجب في الخارج من الأرض فلا يمنعه الدين."
- Jewellery: "أما عن زكاة الحلي فالجمهور على أنه لا زكاة فيه والحنفية على وجوب الزكاة فيه"
Fidya amount: https://www.islamweb.net/ar/fatwa/28409/
- "فذهب المالكية والشافعية إلى أن مقدار الفدية مدٌّ عن كل يوم ... وهو الأقرب إلى الصواب."
- "وذهب الحنفية إلى أن مقدار الفدية صاع؛ إلا من الحنطة فنصف صاع."
- "وذهب الحنابلة إلى أن مقدار الفدية نصف صاع؛ إلا من الحنطة فمد."
- "الأحوط اعتبار الصاع بثلاثة كيلو جرام"


### Jordan Iftaa — zakat al-fitr in cash: https://www.aliftaa.jo/fatwa/4209/CatQuestion.aspx?Id=152
- "الأصل أن تُخرج زكاة الفطر من غالب قوت البلد، وغالب قوتنا في الأردن القمح أو الأرز، وتُقدر زكاة الفطر بـ(2500) غرام عن كل شخص"
- "وأجاز فقهاء الحنفية دفع القيمة نقدًا؛ لأنه أنفع للفقير، وأيسر على المزكي."
### Islamweb — zakat al-fitr in cash: https://www.islamweb.net/ar/fatwa/71159/
- "فإخراج النقود عن زكاة الفطر محل خلاف والذي عليه جمهور أهل العلم من المالكية والحنابلة والشافعية عدم الإجزاء، ويجزئ ذلك عند الحنفية وقد اختار الإجزاء شيخ الإسلام ابن تيمية في حال ما إذا كان إخراجها نقوداً أعظم مصلحة للفقير"
- "فالمسألة إذاً مسألة خلافية والقولان فيها معتبران عند أهل العلم"

### MUIS (Majlis Ugama Islam Singapura) — gold jewellery fatwa (revised 9 June 2011; page updated 21 Feb 2025)
URL: https://www.muis.gov.sg/resources/khutbah-and-religious-advice/fatwa/zakat-on-gold-jewellery--english/
- "Fatwa Committee also agrees that the ‘ urf amount remains at 200 dinar , 200 mithqal and 860 gram."
- "The Fatwa Committee views that zakat becomes obligatory on jewellery only when a piece of jewellery reaches 860 gram."
- "gold jewellery that is kept for the purpose of investment must be subject to zakat if it has reached the nisab rate of 86 grams, and the zakat must be calculated based on the total weight of the gold jewellery."
  → MUIS uses 86 g (not 85 g) for gold nisab. (MUIS FAQ reportedly also says haul = "one Hijrah year or 355 days" — not opened, unverified.)

### BAZNAS (Indonesia) — 2026 nisab for income zakat (SK Ketua BAZNAS No. 15/2026)
URL: https://baznas.go.id/news-show/BAZNAS_RI_Tetapkan_Nisab_Zakat_Penghasilan_dan_Jasa_2026_Rp7.640.144_per_bulan/3777
- "Penetapan nisab ini mengacu pada harga emas 14 karat dengan nilai setara 85 gram emas, sehingga menghasilkan angka Rp91.681.728 per tahun atau Rp7.640.144 per bulan. Harga diperoleh dari harga rata-rata emas selama tahun 2025. ... kewajiban zakat sebesar 2,5 persen."
- "Dalam PMA Nomor 31 Tahun 2019 tidak diatur secara spesifik mengenai jenis karat emas, sehingga pada tataran implementasi BAZNAS diberikan kewenangan untuk menetapkan standar jenis karat atas 85 gram emas"
  → Karat basis differs by body: Kuwait 24ct, Egypt 21ct, Indonesia 14ct (all "85 g").

## PART C — FARAID WORKED CASES

### W1. Arabic Wikipedia "عول" (awl) — https://ar.wikipedia.org/wiki/عول
- Husband + 2 full sisters → 6 'awl 7: "فلو كانت المسألة (زوج وأختان شقيقتان) مثلا فمسألتهم من ستة للزوج النصف 3 من 6 وللأختين الثلثان 4 من 6 المجموع 4+3=7 فأصل المسألة: 6 وتعول إلى: 7"
- Husband + 2 full sisters + mother → 'awl 8: "زوج وشقيقتان وأم؛ مسألتهم من ستة للزوج النصف ثلاثة، وللأختين الثلثان أربعة، وللأم السدس واحد، وتعول المسألة إلى ثمانية."
- Husband + mother + full sister → 'awl 8: "ماتت امرأة وخلفت زوجها وأمها وأختها الشقيقة ... للزوج (ثلاثة)، وللأم (اثنان)، وللشقيقة (ثلاثة) ... أصل المسألة ستة وتبلغ بالعول ثمانية"
- Husband + full sister (exact, no awl): "مثل: زوج وشقيقة؛ لكل منهما النصف، وأصل المسألة اثنان."
- Husband + son: "زوج وابن فأصل المسألة من مخرج الربع 4 للزوج الربع 1 من 4 والباقي 3 للابن."
- Mother + son: "أم وابن، للأم السدس (واحد)، وللابن الباقي وهو (خمسة)"
- 'Awl ceilings: "الستة تعول إلى: 7/ 8/ 9/ 10 . الإثنى عشر؛ تعول إلى: أن تبلغ 17 . الأربعة والعشرون؛ تعول إلى: 27 ."
- Radd (daughter + mother): "بنت وأم؛ أصل المسألة ستة، للبنت النصف 3 وللأم السدس 1 والباقي 2 يرد عليهما ... ويرجع أصل المسألة في هذه الحالة إلى 4 فيكون نصيب الأم بالفرض والرد معا هو الربع 1 من 4 ونصيب البنت ... ثلاثة أرباع 3 من 4"
- Radd excludes spouses (Hanafi etc.): "الحنفية فيقولون بأن الباقي يرد على أصحاب الفروض ماعدا أحد الزوجين فلا يكون ممن يرد عليه." ; Malik: residue to bayt al-mal ("وهو قول مالك حيث قال بتوريثه مطلقا، وعند الشافعي يرث إذا انتظم")

### W2. Arabic Wikipedia "حساب الفرائض" — https://ar.wikipedia.org/wiki/حساب_الفرائض
- "زوج وأخت لأبوين أو لأب؛ فلكل منهما النصف ومخرجه 2و 2 نكتفي بأحدهما ويكون أصل المسألة اثنان واحد للزوج وواحد للأخت."
- "زوج وبنت وعم للزوج الربع واحد وللبنت النصف اثنان والباقي واحد للعم." (base 4)
- "زوجة وبنت وعم؛ للزوجة الثمن واحد وللبنت النصف 4 والباقي للعم." (base 8)
- "أم وأخ لأم وعم ... أصل المسألة 6 للأم الثلث 2 وللأخ لأم السدس 1 والباقي 3 للعم."
- "أم وشقيقتان وعم ... للأم السدس 1 وللشقيقتين الثلثان 4 والباقي للعم 1 ."
- "شقيقتين وأم وأخ لأم؛ أصل المسألة ستة للشقيقة 4 وللأم 1 للأخ لأم 1 ."
- "زوج وخمسة أبناء؛ أصل المسألة أربعة للزوج الربع واحد، والباقي ثلاثة للأبناء الخمسة وهي غير منقسمة عليهم. فتحتاج المسألة للتصحيح" (→ 20)

### W3. Arabic Wikipedia "العصبات" — https://ar.wikipedia.org/wiki/العصبات
- Wife + son + daughter: "إذا توفي شخص وترك زوجةً وابناً وبنتاً، فإن الزوجة تأخذ الثمن فَرضَاً، والابن والبنت يأخذان الباقي تعصيباً" (→ wife 1/8 = 3/24, son 14/24, daughter 7/24)

### W4. Arabic Wikipedia "الأكدرية" — https://ar.wikipedia.org/wiki/الأكدرية
- Heirs: "زوج وأم وجد وأخت" ; "للزوج النصف وهو: (ثلاثة) وللأم الثلث وهو: (اثنان) وللجد: (واحد)، وللأخت النصف (ثلاثة)، تعول المسألة، إلى تسعة" ; "ثم يجمع نصيب الأخت ونصيب الجد، ويعودان إلى المقاسمة، وتصح المسألة من: سبعة وعشرين"
- Views: "مذهب أبي بكر الصديق ومن وافقه: عدم توريث الأخت، فللأم الثلث، وللزوج النصف، والباقي للجد." ; "مذهب علي بن أبي طالب وزيد ابن ثابت، وأصحاب المذاهب الأربعة ... تعول إلى تسعة ... للجد سهمان وللأخت سهم."
  ⚠ Wikipedia's "أصحاب المذاهب الأربعة" conflicts with the Hanafi position that the grandfather excludes siblings (see Ibn Taymiyya below: "ومذهب أبي حنيفة"). For a Hanafi mode, Akdariyya does not arise: husband 1/2, mother 1/3, grandfather rest (1/6), sister excluded.

### W5. English Wikipedia "Islamic inheritance jurisprudence" — https://en.wikipedia.org/wiki/Islamic_inheritance_jurisprudence
- "if there are only parents and a husband, the husband will receive half, the father gets 1/6 and the mother gets 2/6. This is according to Ibn Abbas's interpretation of verses 11, 12 of Surah An-Nisa." (minority view; majority = Umariyya, below)

### I1. Minbariyya — Islamweb fatwa 359851: https://www.islamweb.net/ar/fatwa/359851/
- Heirs: "أب وأم وزوجة وبنتان"
- "وأصل التركة من أربعة وعشرين، وتعول لسبعة وعشرين لتزاحم الفروض فيها، وتسمى هذه المسألة عند الفرضيين بالمنبرية ... صار ثمنها تسعا"
- "للأب منها: أربعة أسهم، وللأم منها: أربعة أسهم أيضا، وللزوجة منها: ثلاثة أسهم، وللبنتين منها: ستة عشر سهما، لكل واحدة منهما: ثمانية أسهم"
Also fatwa 213991 (https://www.islamweb.net/ar/fatwa/213991/) gives 1000 → "الزوجة 111.11 ... الأب 148.14 ... الأم 148.14 ... لكل بنت 296.29"

### I2. Umariyya 1 (husband + mother + father) — Islamweb 282730: https://www.islamweb.net/ar/fatwa/282730/
- "أصلها من ستة: فيقسم المال على ستة أسهم، يأخذ الزوج نصفها -ثلاثة أسهم-، وتأخذ الأم ثلث الباقي، وهو سهم واحد، ويأخذ الأب سهمان" ; "ولا شيء للعم"
Definition + madhhab note — Islamweb 15603: https://www.islamweb.net/ar/fatwa/15603/
- "فالعمريتان ( وتسمى الغراوين والغريبتين والغريمتين ) وهي : زوج وأم وأب ، أو زوجة وأم وأب ، فيعطى الزوج حقه أو الزوجة، وثلث الباقي للأم، وما بقي فهو للأب. هذا هو مذهب جمهور العلماء ومنهم الأئمة الأربعة. وذهب ابن عباس والظاهرية وآخرون إلى أن الأم تأخذ ثلث جميع المال"

### I3. Umariyya 2 (wife + mother + father) — Islamweb 171453: https://www.islamweb.net/ar/fatwa/171453/
- "فتقسم التركة على أربعة أسهم للزوجة سهم، وللأم سهم، وللأب سهمان."

### I4. Akdariyya + Musharraka (+ Malikiyya) — Islamweb 204760: https://www.islamweb.net/ar/fatwa/204760/
- Akdariyya: "أركانها: زوج، وأم، وجد, وأخت شقيقة أو من الأب, فللزوج النصف، وللأم الثلث، ويُفرض للأخت النصف, وللجد السدس, وأصل المسألة من ستة وتعول إلى تسعة, ثم ... فتصح من سبعة وعشرين, للزوج منها: تسعة أسهم, وللأم منها ستة أسهم ... فتأخذ الأخت أربعة أسهم, ويأخذ الجد ثمانية أسهم"
- Musharraka: "فأركانها زوج, وأم, واثنين ـ أو أكثر ـ من ولد الأم, وأخ شقيق أو أكثر, فللزوج النصف، وللأم السدس، ولولد الأم الثلث، ولا يبقى شيء للأخ الشقيق، فيسقط في الأصل، لأنه عاصب يأخذ ما بقي, ولكن بما أنه يشترك مع ولد الأم في الإدلاء إلى الميت بالأم، فإنه يعتبر هنا ولد أم ويشارك ولد الأم في ثلثهم"
### I5. Musharraka madhhab split — Ibn Taymiyya, Majmu' al-Fatawa (Islamweb library): https://www.islamweb.net/ar/library/content/22/5096/
- "الثلث يختص به ولد الأم كما هو قول علي ومن وافقه وهو مذهب أبي حنيفة وأحمد في المشهور عنه وروى حرب التشريك وهو قول زيد ومن وافقه وقول مالك والشافعي"
- Grandfather & siblings: "فجمهور الصحابة موافقون للصديق في أن الجد كالأب يحجب الإخوة وهو مروي عن بضعة عشر من الصحابة ومذهب أبي حنيفة وأحد الوجهين في مذهب الشافعي وأحمد"

### I6. Daughter + son's daughter + full sister — Islamweb 172621: https://www.islamweb.net/ar/fatwa/172621/  (+ Bukhari 6736)
- "فإن لابنته النصف ولبنت الابن السدس تكملة الثلثين، وللشقيقة الباقي ـ تعصيبا" ; "فتقسم التركة على ستة أسهم, للبنت نصفها, ثلاثة أسهم, ولبنت الابن سدسها, سهم واحد, والباقي سهمان للشقيقة"
- Islamweb 41727 (https://www.islamweb.net/ar/fatwa/41727/): daughter + full sister + full brother's son → "فللبنت النصف فرضاً والباقي للأخت الشقيقة تعصيباً، وليس لابن الأخ الشقيق شيء"

### I7. Radd: mother + daughter — Islamweb 319204: https://www.islamweb.net/ar/fatwa/319204/
- "وما بقي بعد سدس الأم ونصف البنت يُرَدُّ عليهما أيضًا، فتقسم التركة (الخمسة ملايين) على أربعة أسهم؛ للأم منها سهم واحد فرضًا وردًّا، وللبنت ثلاثة أسهم" ; table "6 وتصير بالرد 4"
### I8. Radd with a spouse: wife + mother + daughter — Islamweb 127741: https://www.islamweb.net/ar/fatwa/127741/
- "والباقي يرد على الأم والبنت ولا يرد على الزوجة، فتقسم التركة على (32 سهماً)، للزوجة ثمنها (4 أسهم)، وللأم منها (7 أسهم) فرضاً ورداً، وللبنت منها (21 سهماً) فرضاً ورداً."
### I9. Radd with a spouse: husband + mother + daughter — Islamweb 227083: https://www.islamweb.net/ar/fatwa/227083/
- "والباقي يرد على البنت والأم، فتقسم التركة على ستة عشر سهما: للزوج ربعها: أربعة أسهم فرضا، وللبنت منها تسعة أسهم فرضا وردا، وللأم منها ثلاثة أسهم فرضا وردا." (condition stated: "ولم يكن لها عاصب ولو بعيدا في النسب")
### I10. Husband + full sisters ('awl 7) and + uterine siblings ('awl 9) — Islamweb 48741: https://islamweb.net/ar/fatwa/48741/
- "للزوج ... النصف ... وللأخوات الشقيقات الثلثان ... فالتركة إذاً من ستة مخرج النصف والثلثين وتعول السبعة. للزوج ثلاثة وللأخوات أربعة."
- with uterine siblings (2+): "فأصل المسألة ستة ... وتعول لتسعة، للزوج منها ثلاثة، وللشقيقات أربعة، وللذين من جهة الأم اثنان"
- single uterine sibling: "فالتركه في الفرض الأخير تعول من ستة إلى ثمانية، له هو منها واحد، وللزوج ثلاثة، وللشقيقات أربعة."
### I11. Mother reduced to 1/6 by siblings even when they are excluded by father — Islamweb 409885: https://www.islamweb.net/ar/fatwa/409885/
- Heirs: wife, father, mother, 2 brothers, 2 sisters. "فإن لأمه السدس لوجود جمع من الإخوة ... ولزوجته الربع ... والباقي للأب تعصيبا" ; table base 12: "أم 2 / زوجة 3 / أب 7"
- Minority (Ibn Taymiyya, al-Sa'di): mother gets 1/3 because siblings are excluded; "والجمهور على خلافه، والمفتى به عندنا في هذه المسألة هو مذهب الجمهور"
### I12. Husband + mother + full siblings (male+female) — Islamweb 140483: https://www.islamweb.net/ar/fatwa/140483/
- Heirs: mother, husband, 4 full brothers, 5 full sisters, 1 paternal brother, 3 paternal sisters. "لأمها السدس ... ولزوجها النصف ... والباقي للإخوة الأشقاء والأخوات الشقيقات ـ تعصيبا ـ للذكر مثل حظ الأنثيين ... ولا شيء للأخوات والأخ من الأب"
- "فتقسم التركة على ثمانية وسبعين سهما: للأم سدسها: ثلاثة عشر سهما. وللزوج نصفها: تسعة وثلاثون سهما. ولكل أخ شقيق أربعة أسهم. ولكل أخت شقيقة سهمان."


### Kaffarah for deliberately breaking a Ramadan fast
Dar al-Ifta Egypt: https://www.dar-alifta.org/ar/fatwa/details/16806
- Eating/drinking deliberately: "والواجب عليه في هذه الحالة أن يتوب إلى اللهِ تعالى منها، مع وجوب قضاء الصوم فقط من غير كفارة لذلك." (Egypt's chosen view)
- "فمذهب الحنفية والمالكية: أنه يلزمه القضاء، والكفارة؛ وهي صيام شهرين متتابعين"
- al-Marghinani (Hanafi): "ولو أكل أو شرب ما يُتَغَذَّى به أو ما يُدَاوَى به فعليه القضاء والكفارة"
Islamweb 93029: https://www.islamweb.net/ar/fatwa/93029/
- Intercourse: "فالمفطر بالجماع في نهار رمضان عمداً عالماً بالحرمة تجب عليه الكفارة الكبرى" (+ Bukhari 1936 order: slave → 2 consecutive months → 60 poor)
- "وأما إن كان الفطر عمداً بغير الجماع كالأكل أو الشرب -مثلاً- فبعض أهل العلم كالمالكية والحنفية يقولون بلزوم الكفارة"
- quoting al-Baji: "وقال الشافعي: لا كفارة على من أفسد صومه بشيء من ذلك إلا بإيلاج"

## NOT VERIFIED / GAPS
1. AAOIFI SS35 text (2.5775%/2.577% solar rate, 85 g) — standard not freely online; only charity pages attribute 2.577% to AAOIFI (excluded). ZATCA gives the formula only (2.5% × days/354 → 2.5777% for 365 days).
2. Lembaga Zakat Selangor (zakatselangor.com.my) — connection refused from this machine; e-SMAF / .gov.my fatwa portals also unreachable. PPZ-MAIWP (Wilayah Persekutuan) used instead; LZS KWSP/saham rules NOT confirmed (Selangor may differ, e.g. its own 'urf for jewellery).
3. "7.5 tola / 52.5 tola", "612.36 g" — no official source; the Pakistani statute says 612.32 g silver / 87.48 g gold. 87.48 vs 87.5 also not officially reconciled.
4. sunnah.com blocked by Cloudflare (403) — hadith texts verified via the fawazahmed0 hadith-api mirror with matching Bukhari numbers (1503, 1504, 1506, 1483, 1447, 1405, 1936, 6736). Open the sunnah.com links in a browser once before publishing.
5. Kuwait Zakat House solar-year rate, e.gov.kw page — 403. Only KZH calculator (85 g 24ct) read.
6. Crypto: only PPZ-MAIWP (WP fatwa 134th meeting, gazetted 14 Nov 2022) found as an official zakat ruling; Dar al-Ifta Egypt (2017) says Bitcoin trading is haram, no zakat ruling. BAZNAS / LZS crypto rulings not read.
7. Retirement (401k/UK pension) — no official Western-body fatwa read; IIFA Res. 143 (1/16) is the closest general rule (no zakat while no control; one year on receipt), PPZ KWSP fatwa for EPF.
8. Egypt Law 77/1943 (inheritance) article text, Malaysian e-Faraid / Amanah Raya / JKSM, Brunei — not read (Malaysian gov sites unreachable; Egyptian statute text not located on an official site). Note: Egyptian law is known to allow radd to a spouse when no other heir exists — NOT verified here.
9. Wikipedia AR has no standalone pages for المنبرية / العمريتان / المشتركة (titles missing); those cases are sourced from Islamweb fatwas instead. Wikipedia "الأكدرية" claims the four schools follow Zayd — conflicts with the Hanafi view that the grandfather excludes siblings (Ibn Taymiyya text above).
10. MUIS FAQ (86 g, haul 355 days) — FAQ page not opened; only the jewellery fatwa (86 g / 860 g) was read.
11. Shafi'i minority on mother 1/3 vs 1/6 when siblings are excluded by father (Islamweb 409885) — majority 1/6.
