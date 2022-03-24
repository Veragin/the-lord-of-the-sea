import { TImageStore, createImageStore } from './ImageStore';

import { DataProvider } from './DataProvider';

export class Paint {
    ctx: CanvasRenderingContext2D;
    imgStore: TImageStore | null = null;

    constructor(private canvas: HTMLCanvasElement, private data: DataProvider) {
        const ctx = this.canvas.getContext('2d');
        if (ctx === null) {
            throw new Error('Context was not created');
        }
        this.ctx = ctx;
    }

    init = async () => {
        this.imgStore = await createImageStore();
    };

    render = () => {
        requestAnimationFrame(() => {
            this.ctx.fillStyle = '#80CDFF';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.save();
            this.ctx.translate(this.data.you.data.x, this.data.you.data.y);

            this.data.players.forEach((p) => this.renderPlayer(p));

            this.ctx.restore();
        });
    };

    private renderPlayer = (player: TPlayer) => {
        const image = this.imgStore?.ship;
        if (!image) return;

        console.log('render Player');
        this.ctx.save();
        this.ctx.rotate(player.data.front);

        this.ctx.drawImage(image, player.data.x - 50, player.data.y - 50);

        this.ctx.restore();
    };
}
