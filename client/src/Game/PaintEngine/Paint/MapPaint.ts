import { Paint } from './Paint';

const BORDER_COLOR = 'black';
const BORDER_WIDTH = 4;

export class MapPaint extends Paint {
    render() {
        this.renderBoarder();
        this.data.map.islands.forEach((i) => this.checkRender(i, () => this.renderIsland(i)));
    }

    private renderIsland = (island: TIsland) => {
        this.ctx.fillStyle = 'green';

        this.ctx.beginPath();
        this.ctx.arc(0, 0, island.r, 0, 2 * Math.PI);
        this.ctx.fill();
    };

    private renderBoarder = () => {
        this.ctx.strokeStyle = BORDER_COLOR;
        this.ctx.lineWidth = BORDER_WIDTH;

        const w = this.data.map.width / 2;
        const h = this.data.map.height / 2;

        this.ctx.beginPath();
        this.ctx.moveTo(-w, -h);
        this.ctx.lineTo(w, -h);
        this.ctx.lineTo(w, h);
        this.ctx.lineTo(-w, h);
        this.ctx.lineTo(-w, -h);
        this.ctx.stroke();
    };
}
