import { Pane, TpChangeEvent } from 'tweakpane';
import * as CosineGradientPlugin from '../src';
import { CosineGradient, CosineGradientBladeApi } from '../src';

const pane = new Pane({
    title: 'Cosine Gradient Editor',
});
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

pane.addButton({
    title: 'Randomize',
}).on('click', () => {
    cosineGradient.R.x = Math.random();
    cosineGradient.R.y = Math.random();
    cosineGradient.R.z = Math.random();
    cosineGradient.R.w = Math.random();
    cosineGradient.G.x = Math.random();
    cosineGradient.G.y = Math.random();
    cosineGradient.G.z = Math.random();
    cosineGradient.G.w = Math.random();
    cosineGradient.B.x = Math.random();
    cosineGradient.B.y = Math.random();
    cosineGradient.B.z = Math.random();
    cosineGradient.B.w = Math.random();
    cosineGradientBlade.value = cosineGradient;
    pane.refresh();
});

updateBackground(cosineGradientBlade.controller.value.rawValue);

console.log('Tweakpane initialized with inputs.');