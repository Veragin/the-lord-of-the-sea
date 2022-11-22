import { createItem } from 'Const/Items';
import { Player } from 'GameManager/Player/Player';
import { Time } from '../../utils/time';
import { Data } from './Data';
import { collisionPointArc } from './Geometry';

export class MineHandler {
    constructor(private data: Data) {}

    process(now: Time) {
        this.data.players.forEach((p) => {
            this.shipMine(p, now);
        });
    }

    private shipMine = (player: Player, now: Time) => {
        const ship = player.ship;

        if (ship.mineCooldown.isAfter(now)) {
            return;
        }

        if (player.control.mine) {
            const mine = this.findMineInPosition(ship);
            if (mine === null) return;

            ship.mineCooldown = now.moveToFutureBy(ship.mineSpeed);
            player.inventory.add([createItem(mine.source)]);
        }
    };

    private findMineInPosition = (point: TPoint) => {
        for (let mine of this.data.map.mines) {
            if (collisionPointArc(point, mine)) {
                return mine;
            }
        }

        return null;
    };
}
