import { Paint } from './Paint';

const SHIP_PADDING = 10;

const SHIP_HEALTH_BAR_PADDING_TOP = 80;
const SHIP_HEALTH_BAR_WIDTH = 80;
const SHIP_HEALTH_BAR_HEIGHT = 5;

export class PlayerPaint extends Paint {
    render() {
        this.data.players.forEach((p) => this.checkRender(p.data, () => this.renderPlayer(p)));
    }

    private renderPlayer = (player: TPlayer) => {
        const image = player.data.sail ? this.imgStore.baseOn : this.imgStore.baseOff;

        this.ctx.save();
        this.ctx.rotate(player.data.angle - Math.PI / 2);
        this.ctx.drawImage(
            image,
            -player.const.w / 2 - SHIP_PADDING,
            -player.const.h / 2 - SHIP_PADDING,
            player.const.w + 2 * SHIP_PADDING,
            player.const.h + 2 * SHIP_PADDING
        );
        this.ctx.restore();

        this.renderHealthBar(player);
    };

    private renderHealthBar = (player: TPlayer) => {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(
            -SHIP_HEALTH_BAR_WIDTH / 2,
            SHIP_HEALTH_BAR_PADDING_TOP,
            SHIP_HEALTH_BAR_WIDTH,
            SHIP_HEALTH_BAR_HEIGHT
        );

        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(
            -SHIP_HEALTH_BAR_WIDTH / 2,
            SHIP_HEALTH_BAR_PADDING_TOP,
            (SHIP_HEALTH_BAR_WIDTH * player.data.health) / player.data.maxHealth,
            SHIP_HEALTH_BAR_HEIGHT
        );
    };
}
