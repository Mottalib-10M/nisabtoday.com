import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const POT = 84000;
const full = POT * E.P.rate.lunar;
const access = POT * 0.9 * E.P.rate.lunar;

export default defineGuide({
  id: 'zakat-on-pension', group: 'assets', order: 50, tool: 'pension', toolArg: { bal: 84000, pen: 10, tax: 0 },
  related: ['zakat-on-shares', 'zakat-on-savings', 'how-to-calculate-zakat', 'zakat-calculator-usa', 'zakat-calculator-uk', 'zakat-calculator-malaysia'],
  sources: ['iifa-pension', 'ppz-epf', 'a-irs-early', 'a-govuk-pension-age', 'a-govuk-pension-taxfree'],
  en: {
    slug: 'zakat-on-pension', nav: 'Zakat on pension', card: '401(k), workplace pension or EPF: the three readings of a locked fund and the amount under each.',
    title: 'Zakat on Pension 2026: 401(k), Workplace Pots and EPF',
    description: 'Zakat on pension in 2026: a 401(k), UK workplace pot or Malaysian EPF, the Fiqh Academy ruling on locked funds, the value you could withdraw, and both amounts.',
    h1: 'Zakat on a pension, a 401(k) or EPF savings',
    intro: 'Enter the value of your pot, the penalty and tax you would pay on an early withdrawal, and whether you can take the money today.',
    resume: `Scholars give three answers on a pension, and they lead to very different sums. The International Islamic Fiqh Academy, in resolution 143, holds that money in a fund you cannot control is not yet fully yours: no zakat while it is locked, then zakat for one year when it is paid to you. The same resolution says that a fund held in your name where you choose the investments is added to your zakatable wealth every year. A third reading counts each year only what you could withdraw today, after the early withdrawal penalty and tax. On a ${E.money(POT, 'USD')} 401(k), where the IRS charges an additional 10 % before age 59½, the zakat this year is ${E.money(full, 'USD')} on the full balance, ${E.money(access, 'USD')} on the balance less the penalty before income tax, and nothing under the locked-fund reading. Malaysia’s zakat centre charges EPF savings only when they are withdrawn.`,
    faqs: [
      { q: 'Does a 401(k) count as a fund I control?', a: 'It depends on how you read the Fiqh Academy’s words. Resolution 143 treats a savings fund in the employee’s name, where the employee decides how it is invested, as zakatable every year. Many 401(k) plans let you pick the funds, which comes close to that description, but you cannot freely take the money before 59½ without the IRS additional tax. Some scholars therefore count the full value, others only what you could withdraw.' },
      { q: 'I am 40 and my UK workplace pension is locked until 55. Do I pay anything now?', a: 'Under the reading of resolution 143 for a fund you have no right to control, nothing until it is paid out, and then zakat for one year. GOV.UK says you can usually take money from a personal or workplace pension after 55, depending on the scheme rules. Under the accessible-value reading, a pot you cannot reach today counts for zero this year, which gives the same result.' },
      { q: 'What about the 25 % I can take tax free?', a: 'GOV.UK says you can usually take up to a quarter of a pension as a tax-free lump sum. Once that lump sum is paid into your account, it is money you own and it joins your savings on your next zakat day. While it stays in the pension it follows the rule you apply to the rest of the pot.' },
      { q: 'Is zakat due on my EPF withdrawal for a house?', a: 'Not under the Federal Territories fatwa of November 2019 quoted by the Kuala Lumpur zakat centre. Withdrawals made for basic needs, such as housing, education, health or permanent disability, are not charged zakat. Withdrawals that you are free to spend as you like are charged at 2.5 % on the whole amount if it reaches the nisab, without waiting for a year.' },
    ],
    body: (h) => {
      const cur = 'USD';
      const yearly = h.zakat({ cur, cash: 9000, pension: POT * 0.9, pensionRule: 'yearly', basis: 'silver' });
      const receipt = h.zakat({ cur, cash: 9000, pension: POT * 0.9, pensionRule: 'receipt', basis: 'silver' });
      const fullRow = h.zakat({ cur, cash: 9000, pension: POT, pensionRule: 'yearly', basis: 'silver' });
      const rows = [
        ['Full balance every year', h.money(POT, cur), h.money(fullRow.zakat, cur)],
        ['What you could withdraw (less the 10 % additional tax)', h.money(POT * 0.9, cur), h.money(yearly.zakat, cur)],
        ['Locked fund: nothing until paid out', h.money(0, cur), h.money(receipt.zakat, cur)],
      ];
      return `
<h2>Why a pension is a hard case</h2>
<p>Zakat is due on wealth you own fully, the condition jurists call complete ownership, and that you have held for a lunar year. A pension strains both conditions. The money is in your name, it grows, and its value is printed on every statement, yet you cannot spend it, and if you take it early the state takes a slice. Classical books had nothing like it, so modern councils reasoned from the closest cases: wages held back by an employer, and investment accounts with restrictions on withdrawal.</p>
<p>The ${h.src('iifa-pension', 'International Islamic Fiqh Academy, resolution 143')}, adopted at its sixteenth session, is the most cited answer. It separates two kinds of savings fund. If the money is deposited in an account in the employee’s name and the employee can decide the types of investment, it is added to the zakatable assets and zakat is paid on it. If it is deposited in an account the employee has no right to control, no zakat is due on it yet, because ownership is not complete; when the employee receives it, zakat is paid for one year only.</p>

<h2>Three readings, three amounts on one 401(k)</h2>
<p>Take a nurse in Houston with ${h.money(9000, cur)} in the bank and a 401(k) worth ${h.money(POT, cur)}. She is 41. Under US rules, money she takes out before 59½ is charged an additional 10 % on top of ordinary income tax unless an exception applies (${h.src('a-irs-early', 'IRS')}). The income tax depends on her bracket, so the examples below leave it out; put your own rate in the calculator above.</p>
${h.table(['How the pension is counted', 'Pension counted', 'Zakat this year, with her cash'], rows, `Zakat at ${h.pct(h.P.rate.lunar)} on the silver nisab of ${h.priceDay}; income tax left out.`, ['l', 'r', 'r'])}
<p>The first line follows those who apply the Academy’s second case to any plan where you pick the funds. The second line is the accessible-value reading: count what would actually reach your hand today. The third line follows the Academy’s first case, for someone who considers that a plan they cannot draw on is a fund they do not control. On the third reading she still owes zakat on her cash, ${h.money(receipt.zakat, cur)}, and when the 401(k) is finally paid to her she pays one year’s zakat on what she receives.</p>
${h.mini('pension', { t: 'Your 401(k) after the 10 % additional tax', p: ['bal', 'tax', 'acc'], d: { bal: POT, pen: 10, tax: 0, cur } })}

<h2>UK workplace and personal pensions</h2>
<p>${h.src('a-govuk-pension-age', 'GOV.UK')} says that when you can take money from a pension pot depends on the scheme’s rules, but it is usually after you are 55. Before that age, most savers cannot reach the money at all, and both the locked-fund reading and the accessible-value reading give zero for the year. After 55, the pot becomes reachable, and the accessible-value reading starts counting what you could take out after tax.</p>
<p>The tax-free part is the other UK detail: you can usually take up to 25 % of a pension as a tax-free lump sum (${h.src('a-govuk-pension-taxfree', 'GOV.UK')}). For a saver over 55 who wants to count only what is reachable, that quarter comes without tax and the rest is usually taxed, at a rate that depends on the saver. A self-invested personal pension, where you choose every holding, comes close to the Academy’s description of a fund you direct.</p>
${h.mini('pension', { t: 'A UK pot you cannot reach before 55', p: ['bal', 'acc'], d: { bal: 62000, pen: 0, tax: 0, acc: 'no', cur: 'GBP' } })}

<h2>Malaysia’s EPF</h2>
<p>The ${h.src('ppz-epf', 'Federal Territories zakat centre')} takes the locked-fund line for the Employees Provident Fund. EPF savings cannot be withdrawn at will like an ordinary account, so they do not meet the condition of complete ownership; zakat falls due when money is withdrawn. A fatwa of the Federal Territories of November 2019 refines it. Withdrawals that the member is free to use, and not for basic needs, are charged ${h.pct(h.P.rate.lunar)} on the whole amount withdrawn if it reaches the nisab, without waiting for a year. Withdrawals for housing, education, health and permanent disability are not charged. The centre uses the nisab of 85 g of gold for EPF, as for other money.</p>

<h2>Which reading to follow</h2>
<p>This site does not choose. The Fiqh Academy ruling is the one most bodies quote, and its text turns on control: can you decide where the money goes, and can you take it? Answer those two questions for your own plan, read the two cases of the resolution, and if your plan sits between them, ask a scholar you trust. Whatever you decide, keep the same reading every year, so that a pot is neither skipped nor counted twice. Shares held inside a pension follow the same split between trading and long-term holdings explained on the ${h.a('zakat-on-shares', 'shares page')}, and the ${h.a('how-to-calculate-zakat', 'full method')} shows where the pension line sits among your other wealth.</p>
`;
    },
  },
});
