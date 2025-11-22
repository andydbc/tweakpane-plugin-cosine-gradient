import type { TpPluginBundle } from '@tweakpane/core';
import { CosineGradientBladePlugin } from './plugin.ts';
import styles from './style.css?inline';

export const CosineGradientPluginBundle: TpPluginBundle = {
  id: 'cosineGradient',
  plugins: [CosineGradientBladePlugin],
  css: styles,
};