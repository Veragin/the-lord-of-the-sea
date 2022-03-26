import { GAME_VISIBLE_HEIGHT, GAME_VISIBLE_PADDING, GAME_VISIBLE_WIDTH } from './constants';
import { TImageStore, createImageStore } from './ImageStore';

import { DataProvider } from './DataProvider';

const BORDER_W = GAME_VISIBLE_WIDTH / 2 + GAME_VISIBLE_PADDING;
const BORDER_H = GAME_VISIBLE_HEIGHT / 2 + GAME_VISIBLE_PADDING;

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
                this.canvas.width / 2 + this.data.you.data.x,
                this.canvas.height / 2 + this.data.you.data.y
            );

            this.data.islands.forEach((i) => this.checkRender(i, () => this.renderIsland(i)));
            this.data.players.forEach((p) => this.checkRender(p.data, () => this.renderPlayer(p)));

            this.ctx.restore();
        });
    };

    private checkRender = <T extends { x: number; y: number }>(o: T, render: () => void) => {
        const center = this.data.you.data;

        const x = o.x - center.x;
        const y = o.y - center.y;

        if (x < -BORDER_W || x > BORDER_W || y < -BORDER_H || y > BORDER_H) {
            return;
        }

        this.ctx.save();
        this.ctx.translate(-o.x, -o.y);
        render();
        this.ctx.restore();
    };

    private renderPlayer = (player: TPlayer) => {
        const image = this.imgStore?.canoe;
        if (!image) return;

        this.ctx.rotate(player.data.front + Math.PI / 2);
        this.ctx.drawImage(image, -player.const.w / 2, -player.const.h / 2, player.const.w, player.const.h);
    };

    private renderIsland = (island: TIsland) => {
        this.ctx.fillStyle = 'green';

        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, island.w, island.h, 0, 0, 2 * Math.PI);
        this.ctx.fill();
    };
}
