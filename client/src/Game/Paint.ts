import { TImageStore, createImageStore } from './ImageStore';

import { DataProvider } from './DataProvider';

export class Paint {
    ctx: CanvasRenderingContext2D;
    imgStore: TImageStore | null = null;

    constructor(private canvas: HTMLCanvasElement, private data: DataProvider) {
        console.log('create paint');

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
            this.ctx.translate(
                this.canvas.width / 2 - this.data.you.data.x,
                this.canvas.height / 2 - this.data.you.data.y
            );

            this.data.islands.forEach((i) => this.renderIsland(i));
            this.data.players.forEach((p) => this.renderPlayer(p));

            this.ctx.restore();
        });
    };

    private renderPlayer = (player: TPlayer) => {
        const image = this.imgStore?.canoe;
        if (!image) return;

        this.ctx.save();
        this.ctx.rotate(-player.data.front);
        this.ctx.drawImage(
            image,
            player.data.x - player.const.w / 2,
            player.data.y - player.const.h / 2,
            player.const.w,
            player.const.h
        );

        this.ctx.restore();
    };

    private renderIsland = (island: TIsland) => {
        this.ctx.save();
        this.ctx.fillStyle = 'green';

        this.ctx.beginPath();
        this.ctx.ellipse(island.x, island.y, island.w, island.h, 0, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.restore();
    };
}
