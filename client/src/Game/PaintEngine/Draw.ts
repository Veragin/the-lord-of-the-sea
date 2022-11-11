import { DataProvider } from '../DataProvider/DataProvider';
import { TImageStore } from './ImageStore';
import { MapPaint } from './Paint/MapPaint';
import { PlayerPaint } from './Paint/PlayerPaint';

export class Draw {
    mapPaint: MapPaint;
    playerPaint: PlayerPaint;

    constructor(
        private canvas: HTMLCanvasElement,
        private ctx: CanvasRenderingContext2D,
        private imgStore: TImageStore,
        private data: DataProvider
    ) {
        this.mapPaint = new MapPaint(ctx, imgStore, data);
        this.playerPaint = new PlayerPaint(ctx, imgStore, data);
    }

    render = () => {
        this.ctx.save();
        this.ctx.translate(this.canvas.width / 2 - this.data.you.data.x, this.canvas.height / 2 - this.data.you.data.y);

        this.mapPaint.render();
        this.playerPaint.render();
        this.renderBullets();

        this.ctx.restore();

        this.renderWind();
    };

    private renderWind = () => {
        this.ctx.save();
        this.ctx.translate(100, 100);
        this.ctx.rotate(this.data.wind.angle);

        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 60, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(30 * this.data.wind.strength, 0, 5, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.restore();
    };

    private renderBullets = () => {
        this.ctx.fillStyle = 'black';
        for (let bullet of this.data.bullets) {
            this.ctx.beginPath();
            this.ctx.arc(bullet.x, bullet.y, 5, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    };
}
