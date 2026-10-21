# Écrire une page de Zakat Calculator (zakat-calculator)

Notice pour qui écrit les pages. À lire en entier avant d'écrire, avec `~/Documents/GitHub/RECETTE-SITE.md`
(§0, §5, §6, §6.5, §7, §9.3, §11, §17.4, §21, §26).

**Le site** : calculateur de zakat mondial, **anglais** (`/en/`) et **arabe** (`/ar/`, RTL, chiffres latins). Nisab du jour
(or et argent, prix spot du jour, 40 monnaies), zakat par type de bien, par pays, zakat al-fitr, fidya, kaffarah, héritage
islamique (fara'id). Éditeur : la société **Radif Partners** (jamais un nom de personne). Rapport SERP :
`~/Documents/GitHub/reports/zakat-calculator-serp-2026-10-21.md`.

**L'angle** : les calculateurs qui classent sont presque tous ceux d'associations (nzf.org.uk, Islamic Relief…) : une seule
monnaie, un nisab figé, un bouton « Donate ». Nous donnons le nisab du jour dans la monnaie du lecteur, **les deux montants
quand les écoles divergent**, une page et un simulateur par type de bien, et **aucun appel au don**.

## Interdits (non négociables)

- **Aucun lien vers une association, aucun bouton ni appel au don**, aucune association nommée comme lieu où payer
  (Islamic Relief, NZF, Zakat Foundation, Muslim Hands, Penny Appeal, LaunchGood, Human Appeal…). Le test le refuse.
- Le site **n'est pas une autorité religieuse** : jamais « our fatwa », « we rule », « the correct view is » ; on écrit « the
  Hanafi school holds… », « Dar al-Ifta of Egypt rules… ». Là où les écoles divergent et que le montant change, **montrer les
  deux montants** (deux appels du kit) et nommer chaque position avec sa source. La phrase de neutralité est déjà dans le
  gabarit ; une page peut renvoyer à « a scholar you trust » / « عالمًا تثق به » pour un cas personnel, sans en abuser.
- **Aucun chiffre non sourcé.** Tout chiffre vient du kit (`h.…`) ou d'un calcul du moteur. Un nombre absent du kit ne
  s'écrit pas, sauf lu toi-même sur une source officielle (alors ajoute la source dans ton fichier `src/data/sources-a.json`
  ou `sources-b.json`, voir plus bas, et cite-la avec `h.src`). Les notes de recherche déjà relues sont dans
  `research/rules-and-faraid-cases.md` (règles, positions des écoles, cas d'héritage, avec citations et URL) et
  `research/fitr-fidya-kaffarah-1447.md` (montants 1447) : **lis-les avant d'écrire une règle**.
- **Montants 2027 / 1448** : jamais inventés. Écrire « to be published before Ramadan 1448 » / « لم تُعلن بعد ».
- Pas de chiffres « en dur » qui bougent : le prix de l'or change chaque jour. Une phrase doit rester vraie quel que soit le
  cours (« the gold nisab is ${h.dec(h.ratio(),1)} times the silver one », jamais « gold is at $4,132 »).
- Aucun lien vers un site du portefeuille (`~/Documents/GitHub/_trame/domaines-ovh.txt`).
- Liens externes : seulement `h.src(clé)` (clés de `params-2026.json > sources` et de `src/data/sources-*.json`).
- Pas de tiret cadratin ni demi-cadratin (— –), nulle part, ni en anglais ni en arabe. Pas de « it's important to note »,
  « dive into », « delve », « Moreover », « Additionally », « Furthermore », « unlock », « guaranteed », pas d'émoji, pas de
  conclusion qui résume.

## Les fichiers d'une page

Une page = **un fichier** `src/content/guides/<id>.ts` (`defineGuide`), qui porte l'anglais (`en`) et, pour les pages prévues
en arabe (`PLANNED_AR` dans `src/lib/planned.ts`), l'arabe (`ar`). Routes, menus, sitemap, hreflang, schémas et liens se
construisent seuls. **Modèle (copier la structure, jamais les phrases)** : `src/content/guides/nisab.ts`.

| Champ | Règle |
|---|---|
| `id` = nom du fichier | id de `planned.ts` |
| `group` | `zakat`, `assets`, `country`, `fitr`, `inheritance` ; `order` = rang dans le groupe (10, 20, 30…) |
| `tool`, `toolArg` | une clé de `src/lib/tool-specs.ts` et ses valeurs par défaut (ne pas fixer `cur` sauf page pays : la langue choisit USD / SAR) |
| `related` | 3 à 6 ids de `planned.ts` |
| `sources` | ≥ 3 clés de sources |
| `en` / `ar` | `PageText` ci-dessous |

`PageText` :

| Champ | Règle |
|---|---|
| `slug` | minuscules latines et tirets, sans année ; en arabe **le même slug que l'anglais** |
| `nav`, `card` | libellé court du menu ; une phrase pour les cartes |
| `title` | **50 à 60 caractères**, contient **2026**, **terme-clé en tête** (« Zakat on Gold 2026: … », « زكاة الذهب 2026: … »). Jamais How/What/When/Why/Is/Can/Who/Calculator/un nom de pays en tête ; en arabe jamais كيف/ما/متى/هل/من en tête. Unique |
| `description` | **150 à 160 caractères**, contient 2026, unique. Pas de valeur variable (cours) dedans |
| `h1`, `intro` | `intro` : une phrase qui dit quoi saisir dans le calculateur |
| `resume` | **UN** paragraphe de 120 mots ou plus (130 à 170) : la réponse directe, chiffres du kit compris. Écrit au niveau du module avec `const E = makeKit('en'), A = makeKit('ar')` (voir le modèle) |
| `faqs` | 3 à 6 vraies questions, réponses **40 à 90 mots** (vise 50 à 75) ; **une question n'existe qu'une fois sur tout le site** (accueil compris, `src/content/home.ts`) |
| `body(h)` | HTML (`h2`, `h3`, `p`, `ul`, `h.table`, `h.box`). **≥ 650 mots de prose hors tableaux en anglais** (vise 750 à 950), **≥ 520 mots en arabe** (vise 600 à 800). 1 à 3 mini-simulateurs, au moins un |

## Le kit (`h` dans `body`, `makeKit(lang)` au niveau du module)

```ts
h.P                         // params-2026.json : P.nisab.conventions.g85 {gold:85, silver:595}, .pk {gold:87.48, silver:612.32},
                            // P.nisab.pk1447.pkr (503529, nisab bancaire pakistanais du 1er Ramadan 1447), P.nisab.urf {ppz:800, muis:860},
                            // P.rate.lunar (0.025), P.rate.solar (0.025×365/354), P.faraid.bequestMax (1/3), P.fitr.saKg {majority:2.04, jordan:2.5, hanafiHalfSaKg:1.625, hanafiSaKg:3.25, caution:3}
h.nisab('silver'|'gold', 'GBP', conv?)   // nisab du jour dans la monnaie ; conv 'g85' (défaut) ou 'pk'
h.nisabGrams('gold', conv?), h.ratio()   // grammes ; or ÷ argent aujourd'hui
h.gram('gold'|'silver', cur), h.goldGram(carat, cur)
h.priceDay, h.PRICE_DAY     // date des prix écrite en toutes lettres ; ISO
h.MARKET.fx                 // les 40 monnaies (codes) ; h.cur('PKR') = nom de la monnaie dans la langue
h.zakat({ cur, cash, goldG, goldK, jewelG, jewelK, jewelRule:'include'|'exclude', silverG, silverF, shares, sharesMode:'trade'|'invest', investPct,
          pension, pensionRule:'yearly'|'receipt', crypto, stock, receivable, rentSaved, debts, debtRule:'deduct'|'none', basis:'silver'|'gold', conv, year:'lunar'|'solar' })
                            // → { lines, gross, debtsDeducted, net, nisab, due, rate, zakat }
h.faraid({ deceased:'male'|'female', husband, wives, sons, daughters, sonsSons, sonsDaughters, father, mother, grandfather, patGrandmother, matGrandmother,
           fullBrothers, fullSisters, patBrothers, patSisters, matSiblings }, { mushtaraka:'share'|'exclude' })
                            // → { shares [{ key, count, basis, total (fraction), fard?, perHead }], excluded, notes, base, awl?{from,to}, unallocated? } ; h.frac(f) "1/8"
h.hawl('2026-10-21')        // { end, days, hStart, hEnd } ; h.hijri(iso) « 10 Jumada al-Ula 1448 AH » ; h.ramadan1448, h.shawwal1448 (ISO)
h.FITR, h.fitr('uae')       // montants 1447 : { id, country{en,ar}, body{en,ar}, cur, fitr?, fidya?, kaffarah? (par pauvre nourri), basis?{en,ar}, date, year, url, via? }
                            // ids : uae, pakistan, indonesia, singapore, malaysia-wp, malaysia-selangor, malaysia-johor, malaysia-penang, malaysia-perak,
                            //       malaysia-kelantan, malaysia-sarawak, qatar, jordan, egypt, morocco, algeria, tunisia, usa
h.tool(kind, args)          // résultat d'un calculateur { label, value, sub, rows, table? }
h.money(x, 'GBP') « £1,234 » / « 1,234 ر.س. » · h.money2 (décimales publiées) · h.pct(0.025) « 2.5 % » · h.num · h.dec(x, d) · h.day(iso) · h.grams(g)
h.a(id, texte)              // lien interne (id de planned.ts ; en arabe, seulement vers une page qui a une version arabe : PLANNED_AR)
h.src(clé, texte?)          // lien vers une source citée
h.table(entêtes, lignes, légende, alignements) · h.box(titre, html) · h.mini(kind, { t: 'titre', p: ['champs montrés'], d: { défauts } })
```

## Calculateurs (`tool`, `h.mini`) et leurs champs

| Clé | Champs |
|---|---|
| `zakat` | `cur` · `basis` (`silver`/`gold`) · `cash` · `goldG` · `jewelG` · `shares` · `pension` · `stock` · `debts` · options : `goldK`, `jewelK` (`'24'`,`'22'`,`'21'`,`'18'`,`'14'`), `jewelRule`, `silverG`, `sharesMode`, `investPct`, `pensionRule`, `debtRule`, `conv`, `year` |
| `nisab` | `cur` · `conv` |
| `gold` | `g` · `k` (carat, chaîne) · `cur` · `worn` (`no`/`yes`) · `year` |
| `silver` | `g` · `f` (`'999'`,`'925'`,`'900'`,`'800'`) · `cur` |
| `cash`, `crypto`, `rent` | `amt` · `cur` · `basis` · `year` |
| `shares` | `amt` · `mode` (`trade`/`invest`) · `pc` (% zakatable des actifs) · `cur` · `basis` |
| `pension` | `bal` · `pen` (%) · `tax` (%) · `acc` (`yes`/`no`) · `cur` · `basis` |
| `business` | `stock` · `cash` · `rec` · `pay` · `cur` · `basis` · `year` |
| `debts` | `assets` · `debts` · `owed` · `cur` · `basis` |
| `rate` | `amt` · `cur` |
| `hawl` | `d` · `m` (chaîne `'1'`…`'12'`) · `y` (chaîne) |
| `receive` | `own` · `cur` · `basis` |
| `faraid` | `dec` (`male`/`female`) · `estate` · `wives` · `husband` (`'0'`/`'1'`) · `sons` · `daughters` · `father` · `mother` (`'0'`/`'1'`) · options : `cur`, `debts`, `beq`, `sonsSons`, `sonsDaughters`, `grandfather`, `patGrandmother`, `matGrandmother`, `fullBrothers`, `fullSisters`, `patBrothers`, `patSisters`, `matSiblings`, `mush` |
| `fitr` | `n` · `body` (id de `h.FITR` ou `own`) · `per` |
| `fidya` | `days` · `body` · `per` |
| `kaffarah` | `type` (`fast`/`oath`) · `times` · `body` · `per` |

## Sources ajoutées par toi

Une source officielle **que tu as lue** (site gouvernemental, conseil de fatwa, organisme de zakat statutaire, loi) et qui
manque : ajoute-la dans **ton** fichier (`src/data/sources-a.json` pour l'agent A, `sources-b.json` pour l'agent B), clé
préfixée (`a-…` / `b-…`), au format `{ "a-irs-401k": { "url": "https://…", "label": { "en": "…", "ar": "…" } } }`. URL arabes
percent-encodées. Jamais une association, un blog, Wikipédia ou un forum.

## Ton et unicité

- Anglais britannique simple, voix humaine, phrases de longueur variable, le chiffre d'abord. Lecteur : une famille de
  Birmingham, Houston, Lahore ou Kuala Lumpur qui veut savoir combien payer avant Ramadan. Expliquer chaque terme arabe à sa
  première apparition (nisab, hawl, ‘awl…).
- Arabe : arabe standard moderne clair, sans fautes, chiffres latins (le kit les écrit), termes fiqhiques exacts (ربع العشر،
  الحول، النصاب، العصبة، الحجب، العول، الرد). Ce n'est pas une traduction de l'anglais : même sujet, exemples propres (en
  SAR, AED, KWD, EGP…).
- **Unicité** (§6) : `python3 scripts/sim-pages.py` compare toutes les pages (seuil 30 %). Angle propre, `h2` propres,
  exemples chiffrés propres (montants, monnaies différents d'une page à l'autre). Jamais reprendre une phrase d'une autre page
  ni du modèle.

## Contrôles

```bash
cd ~/Documents/GitHub/a-publier/Mottalib-10M/zakat-calculator
PAGE_FILES=zakat-on-gold,zakat-on-silver npx vitest run tests/pages.test.ts   # tes pages
npx vitest run tests/pages.test.ts && python3 scripts/sim-pages.py             # tout le site + similarité ≤ 30 %
```
