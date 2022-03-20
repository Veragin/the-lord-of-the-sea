import { DataProvider } from './DataProvider';

export class Paint {
    ctx: CanvasRenderingContext2D;

    constructor(private canvas: HTMLCanvasElement, private data: DataProvider) {
        const ctx = this.canvas.getContext('2d');
        if (ctx === null) {
            throw new Error('Context was not created');
        }
        this.ctx = ctx;
    }

    render = () => {
        requestAnimationFrame(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        });
    };
}
