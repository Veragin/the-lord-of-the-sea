import { Player } from '../Player/Player';
import { Room } from 'RoomManager/Room';

const ENGINE_INTERVAL_MS = 40;
const SHIP_MAX_SPEED = 10;

export class Engine {
    interval: NodeJS.Timer;

    constructor(public room: Room) {
        this.interval = setInterval(this.run, ENGINE_INTERVAL_MS);
    }

    run = () => {
        this.room.users.forEach((u) => {
            if (u.player) this.processPlayer(u.player);
        });
    };

    processPlayer = (player: Player) => {
        const control = player.control;
        const ship = player.ship;

        if (control.left) {
            ship.front += ship.rotate;
        }

        if (control.right) {
            ship.front -= ship.rotate;
        }

        if (control.forward) {
            ship.speedX += Math.sin(ship.front) * ship.speed;
            ship.speedY += Math.cos(ship.front) * ship.speed;

            if (Math.abs(ship.speedX) > SHIP_MAX_SPEED) ship.speedX = Math.sign(ship.speedX) * SHIP_MAX_SPEED;
            if (Math.abs(ship.speedY) > SHIP_MAX_SPEED) ship.speedY = Math.sign(ship.speedY) * SHIP_MAX_SPEED;
        }

        if (control.back) {
            const prevX = ship.speedX;
            const prevY = ship.speedY;

            const newX = ship.speedX - Math.sin(ship.front) * ship.speed;
            const newY = ship.speedY - Math.cos(ship.front) * ship.speed;

            if (Math.abs(prevX) < Math.abs(newX)) {
                ship.speedX = newX;
            } else {
                ship.speedX = 0;
            }
            if (Math.abs(prevY) < Math.abs(newY)) {
                ship.speedY = newY;
            } else {
                ship.speedY = 0;
            }
        }
    };

    destructor = () => {
        clearInterval(this.interval);
    };
}
