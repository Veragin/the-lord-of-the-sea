import { GAME_VISIBLE_HEIGHT, GAME_VISIBLE_PADDING, GAME_VISIBLE_WIDTH } from '../constants';

import { DataProvider } from '../DataProvider';
import { TImageStore } from './ImageStore';

const BORDER_W = GAME_VISIBLE_WIDTH / 2 + GAME_VISIBLE_PADDING;
const BORDER_H = GAME_VISIBLE_HEIGHT / 2 + GAME_VISIBLE_PADDING;

const BOAT_PADDING = 10;

export class Draw {
    constructor(
        private canvas: HTMLCanvasElement,
        private ctx: CanvasRenderingContext2D,
        private imgStore: TImageStore,
        private data: DataProvider
    ) {}

    render = () => {
        this.ctx.save();
        this.ctx.translate(this.canvas.width / 2 - this.data.you.data.x, this.canvas.height / 2 - this.data.you.data.y);

        this.data.islands.forEach((i) => this.checkRender(i, () => this.renderIsland(i)));
        this.data.players.forEach((p) => this.checkRender(p.data, () => this.renderPlayer(p)));

        this.ctx.restore();

        this.renderWind();
    };

    private checkRender = <T extends { x: number; y: number }>(o: T, render: () => void) => {
        const center = this.data.you.data;

        const x = o.x - center.x;
        const y = o.y - center.y;

        if (x < -BORDER_W || x > BORDER_W || y < -BORDER_H || y > BORDER_H) {
            return;
        }

        this.ctx.save();
        this.ctx.translate(o.x, o.y);
        render();
        this.ctx.restore();
    };

    private renderPlayer = (player: TPlayer) => {
        const image = player.data.sail ? this.imgStore.baseOn : this.imgStore.baseOff;

        this.ctx.rotate(player.data.angle - Math.PI / 2);
        this.ctx.drawImage(
            image,
            -player.const.w / 2 - BOAT_PADDING,
            -player.const.h / 2 - BOAT_PADDING,
            player.const.w + 2 * BOAT_PADDING,
            player.const.h + 2 * BOAT_PADDING
        );

        //this.ctx.fillStyle = 'red';
        //this.ctx.fillRect(-player.const.w / 2, -player.const.h / 2, player.const.w, player.const.h);
    };

    private renderIsland = (island: TIsland) => {
        this.ctx.fillStyle = 'green';

        this.ctx.beginPath();
        this.ctx.arc(0, 0, island.r, 0, 2 * Math.PI);
        this.ctx.fill();
    };

    private renderWind = () => {
        this.ctx.save();
        this.ctx.translate(140, 140);
        this.ctx.rotate(this.data.wind.angle);

        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 100, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(60 * this.data.wind.strength, 0, 5, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.restore();
    };
}
