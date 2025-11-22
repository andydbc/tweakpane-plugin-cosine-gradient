import { Point4d } from "@tweakpane/core/dist/input-binding/point-4d/model/point-4d";

export class CosineGradient {

    R: Point4d = new Point4d(0,0,0,0);
    G: Point4d = new Point4d(0,0,0,0);
    B: Point4d = new Point4d(0,0,0,0);

    constructor(R:[number, number, number, number]=[0,0,0,0], G:[number, number, number, number]=[0,0,0,0], B:[number, number, number, number]=[0,0,0,0]) {
        this.R = new Point4d(R[0], R[1], R[2], R[3]);
        this.G = new Point4d(G[0], G[1], G[2], G[3]);
        this.B = new Point4d(B[0], B[1], B[2], B[3]);
    }

    static Default(): CosineGradient {
        return new CosineGradient(
            [0.5, 0.5, 1.0, 0.0],
            [0.5, 0.5, 1.0, 0.33],
            [0.5, 0.5, 1.0, 0.67]
        );
    }

    Evaluate(t: number): [number, number, number] {
        const clampT = Math.max(0, Math.min(1, t));
        const r = Math.floor(255 * (this.R.x + this.R.y * Math.cos(2 * Math.PI * (this.R.z * clampT + this.R.w))));
        const g = Math.floor(255 * (this.G.x + this.G.y * Math.cos(2 * Math.PI * (this.G.z * clampT + this.G.w))));
        const b = Math.floor(255 * (this.B.x + this.B.y * Math.cos(2 * Math.PI * (this.B.z * clampT + this.B.w))));
        return [r, g, b];
    }

    clone(): CosineGradient {
        const newGradient = new CosineGradient();
        newGradient.R = new Point4d(this.R.x, this.R.y, this.R.z, this.R.w);
        newGradient.G = new Point4d(this.G.x, this.G.y, this.G.z, this.G.w);
        newGradient.B = new Point4d(this.B.x, this.B.y, this.B.z, this.B.w);
        return newGradient;
    }
}