# tweakpane-plugin-cosine-gradient

![banner](https://github.com/andydbc/tweakpane-plugin-cosine-gradient/raw/main/preview.png)

Cosine gradient controls for [Tweakpane](https://github.com/cocopon/tweakpane/)

[DEMO](https://tweakpane-plugin-cosine-gradient.vercel.app/)

## Installation

```
npm install @andbc/tweakpane-cosine-gradient
```

## Usage
```typescript
import {Pane} from 'tweakpane';
import * as CosineGradientPlugin from '@andbc/tweakpane-cosine-gradient';
import { CosineGradient, CosineGradientBladeApi } from '@andbc/tweakpane-cosine-gradient';

const pane = new Pane();
pane.registerPlugin(CosineGradientPlugin);

const toCSS = (cosineGradient:CosineGradient): string => {
    const steps = 16;
    const colorStops: string[] = [];
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const [r, g, b] = cosineGradient.Evaluate(t);
        colorStops.push(`rgb(${r}, ${g}, ${b}) ${Math.floor(t * 100)}%`);
    }
    return `linear-gradient(to right, ${colorStops.join(', ')})`;
}

const updateBackground = (gradient: CosineGradient) => {
    const css = toCSS(gradient);
    document.body.style.background = css;
}

const cosineGradient = new CosineGradient(
        [0.5, 0.5, 1.0, 0.0],
        [0.5, 0.5, 1.0, 0.33],
        [0.5, 0.5, 1.0, 0.67]
);

var cosineGradientBlade = pane.addBlade({
    label: 'Cosine Gradient',
    view: 'cosineGradient',
    defaultValue: cosineGradient,
}) as CosineGradientBladeApi;

cosineGradientBlade.on('change', (ev:TpChangeEvent<CosineGradient>) => {
    updateBackground(ev.value);
});

```

## References
The plugin is based on an article written by Inigo Quilez. See the [original article](https://iquilezles.org/articles/palettes/).
