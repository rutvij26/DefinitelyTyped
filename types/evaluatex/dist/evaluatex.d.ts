import type { EvaluatexResult } from './../';

declare function evaluatex(
    /** an ASCII or LaTeX expression to be parsed and evaluated. */
    expression: string,
    /** a map of constant values - values that don't change if you invoke fn more than once. */
    constants?: Record<string, number>,
    /** a map of options for the compiler. */
    options?: { latex?: boolean },
): EvaluatexResult;

export default evaluatex;
