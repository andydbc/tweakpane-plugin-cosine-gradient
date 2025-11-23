import type { TpPlugin } from '@tweakpane/core';
import { CosineGradientBladePlugin } from './plugin.ts';
import styles from './style.css?inline';

export * from './api';
export * from './controller';
export * from './model';
export * from './view';
export * from './plugin.ts';

export const id = 'cosineGradient';
export const css = styles;
export const plugins: TpPlugin[] = [
	CosineGradientBladePlugin
];