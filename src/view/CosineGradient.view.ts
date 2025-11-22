import { ClassName, type View } from '@tweakpane/core';
import { CosineGradient } from '../model/CosineGradient.model';

const className = ClassName('cosine-gradient');

export class CosineGradientView implements View {
    element: HTMLElement;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;

    constructor(document: Document) {
        this.element = document.createElement('div');
        this.element.classList.add(className());
        this.element.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add(className('canvas'));

        this.ctx = this.canvas.getContext('2d');
        this.element.appendChild(this.canvas);
    }

    public updateGradient(gradient:CosineGradient): void {
        if (!this.ctx) {
            return;
        }

        const width = this.canvas.width;
        const height = this.canvas.height;

        for (let x = 0; x < width; x++) {
            const t = x / (width - 1);
            const [r, g, b] = gradient.Evaluate(t);
            this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            this.ctx.fillRect(x, 0, 1, height);
        }
    }
    
}