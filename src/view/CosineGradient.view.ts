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

        this.canvas.width = 1024;
        this.canvas.height = 200;
        this.canvas.style.width = '100%';
        this.canvas.style.height = 'auto';

        this.ctx = this.canvas.getContext('2d');
        this.element.appendChild(this.canvas);

        var topBar = document.createElement('div');
        topBar.classList.add(className('top-bar'));
        this.element.appendChild(topBar);

        var biasSection = document.createElement('div');
        biasSection.classList.add('tp-lblv_l');
        biasSection.classList.add(className('section-label'));
        biasSection.textContent = 'bias';
        topBar.appendChild(biasSection);

        var ampSection = document.createElement('div');
        ampSection.classList.add('tp-lblv_l');
        ampSection.classList.add(className('section-label'));
        ampSection.textContent = 'amp';
        topBar.appendChild(ampSection);
        
        var freqSection = document.createElement('div');
        freqSection.classList.add('tp-lblv_l');
        freqSection.textContent = 'freq';
        freqSection.classList.add(className('section-label'));
        topBar.appendChild(freqSection);
        
        var offsetTitle = document.createElement('div');
        offsetTitle.classList.add('tp-lblv_l');
        offsetTitle.textContent = 'off';
        offsetTitle.classList.add(className('section-label'));
        topBar.appendChild(offsetTitle);

    }

    public updateGradient(gradient:CosineGradient): void {
        if (!this.ctx) {
            return;
        }

        const width = this.canvas.width;
        const height = this.canvas.height;

        const R = gradient.R;;
        const G = gradient.G;
        const B = gradient.B;

        for (let x = 0; x < width; x++) {
            const t = x / (width - 1);
            const [r, g, b] = gradient.Evaluate(t);
            this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            this.ctx.fillRect(x, 0, 1, height);
        }

        this.ctx.lineWidth = 8;
        this.ctx.beginPath();
        for (let x = 0; x < width; x++) {
            const t = x / (width - 1);
            const yR = height - (R.x + R.y * Math.cos(2 * Math.PI * (R.z * t + R.w))) * height;
            if (x === 0) {
                this.ctx.moveTo(x, yR);
            } else {
                this.ctx.lineTo(x, yR);
            }
        }
        this.ctx.strokeStyle = 'red';
        this.ctx.stroke();

        this.ctx.beginPath();
        for (let x = 0; x < width; x++) {
            const t = x / (width - 1);
            const yG = height - (G.x + G.y * Math.cos(2 * Math.PI * (G.z * t + G.w))) * height;
            
            if (x === 0) {
                this.ctx.moveTo(x, yG);
            } else {
                this.ctx.lineTo(x, yG);
            }
        }
        this.ctx.strokeStyle = 'green';
        this.ctx.stroke();

        this.ctx.beginPath();
        for (let x = 0; x < width; x++) {
            const t = x / (width - 1);
            const yB = height - (B.x + B.y * Math.cos(2 * Math.PI * (B.z * t + B.w))) * height;
            
            if (x === 0) {
                this.ctx.moveTo(x, yB);
            } else {
                this.ctx.lineTo(x, yB);
            }
        }
        this.ctx.strokeStyle = 'blue';
        this.ctx.stroke();
        
    }
    
}
