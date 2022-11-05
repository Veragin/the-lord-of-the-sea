import { TImageStore, createImageStore } from './ImageStore';

import { DataProvider } from '../DataProvider/DataProvider';
import { Draw } from './Draw';
import { SEA_COLOR } from '../constants';

export class PaintEngine {
    ctx: CanvasRenderingContext2D;
    imgStore: TImageStore | null = null;
    draw: Draw | null = null;

    initialized = false;
    started = false;

    destroyed = false;

    constructor(private canvas: HTMLCanvasElement, private data: DataProvider) {
        const ctx = this.canvas.getContext('2d');
        if (ctx === null) {
            throw new Error('Context was not created');
        }
        this.ctx = ctx;
    }

    init = async () => {
        this.imgStore = await createImageStore();
        this.draw = new Draw(this.canvas, this.ctx, this.imgStore, this.data);
        this.initialized = true;
    };

    start = () => {
        if (!this.initialized || this.started) {
            return;
        }

        this.render();
    };

    private render = () => {
        requestAnimationFrame(() => {
            this.ctx.fillStyle = SEA_COLOR;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.draw?.render();

            if (!this.destroyed) {
                this.render();
            }
        });
    };

    destructor() {
        this.destroyed = true;
    }
}
