import { type Constraint, ValueMap, createNumberFormatter } from '@tweakpane/core';

export function createAxis(
  constraint: Constraint<number> | undefined,
): any {
  const step = 0.1;
  return {
    baseStep: step,
    constraint: constraint,
    textProps: ValueMap.fromObject( {
      formatter: createNumberFormatter( 2 ),
      keyScale: step,
      pointerScale: step,
    })
  };
}