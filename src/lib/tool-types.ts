/** Declarative calculators (src/lib/tool-specs.ts), rendered by components/calc/SpecTool.tsx. */
export type V = Record<string, number | string>;
interface Common {
  id: string; label: string; help?: string; adv?: boolean; wide?: boolean;
  /** Takes the visitor's current month ('m'), year ('y') or day of month ('d') after mount; the first render keeps the build day. */
  now?: 'm' | 'y' | 'd';
  /** Shown only when another input has this value. */
  showIf?: { id: string; is: string };
}
/** `curUnit`: the unit shown is the symbol of the currency chosen in the input `cur`. */
export interface NumIn extends Common { kind?: 'num'; def: number; unit?: string; curUnit?: boolean; max?: number; decimals?: number }
export interface ChoiceIn extends Common { kind: 'choice'; def: string; options: Array<{ value: string; label: string }> }
export interface SelectIn extends Common { kind: 'select'; def: string; options: Array<{ value: string; label: string }> }
export type Input = NumIn | ChoiceIn | SelectIn;
export interface ToolOut {
  label: string; value: string; sub?: string;
  rows: Array<[string, string, number?]>;
  table?: { caption?: string; headers: string[]; rows: string[][]; align?: Array<'l' | 'r'> };
  note?: string;
}
export interface ToolSpec { inputs: Input[]; run: (v: V) => ToolOut }
