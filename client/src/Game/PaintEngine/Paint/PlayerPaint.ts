import { Paint } from './Paint';

const BOAT_PADDING = 10;

export class PlayerPaint extends Paint {
    render() {
        this.data.players.forEach((p) => this.checkRender(p.data, () => this.renderPlayer(p)));
    }

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
    };
}
