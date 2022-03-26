import { Data } from './Data';
import { Player } from '../Player/Player';

const ENGINE_INTERVAL_MS = 40;

export class Engine {
    interval: NodeJS.Timer | null = null;
    sendData: () => void = () => {};

    constructor(private data: Data) {}

    start = (sendData: () => void) => {
        this.sendData = sendData;
        this.interval = setInterval(this.run, ENGINE_INTERVAL_MS);
    };

    run = () => {
        this.data.players.forEach((p) => {
            this.processPlayer(p);
        });
        this.sendData();
    };

    processPlayer = (player: Player) => {
        this.movePlayer(player);
        this.checkPlayerColision(player);
    };

    movePlayer = (player: Player) => {
        const control = player.control;
        const ship = player.ship;

        if (control.left) {
            ship.front -= ship.rotate;
        }

        if (control.right) {
            ship.front += ship.rotate;
        }

        const cosFront = Math.cos(ship.front);
        const sinFront = Math.sin(ship.front);

        if (control.forward) {
            ship.speedX -= cosFront * ship.speed;
            ship.speedY -= sinFront * ship.speed;

            if (Math.abs(ship.speedX) > ship.maxSpeed) ship.speedX = Math.sign(ship.speedX) * ship.maxSpeed;
            if (Math.abs(ship.speedY) > ship.maxSpeed) ship.speedY = Math.sign(ship.speedY) * ship.maxSpeed;
        }

        if (control.back) {
            const prevX = ship.speedX;
            const prevY = ship.speedY;

            const newX = ship.speedX + cosFront * ship.speed;
            const newY = ship.speedY + sinFront * ship.speed;

            if (Math.sign(prevX) !== Math.sign(newX)) {
                ship.speedX = 0;
            } else if (Math.abs(prevX) < Math.abs(newX)) {
                ship.speedX = prevX;
            } else {
                ship.speedX = newX;
            }
            if (Math.sign(prevY) !== Math.sign(newY)) {
                ship.speedY = 0;
            } else if (Math.abs(prevY) < Math.abs(newY)) {
                ship.speedY = prevY;
            } else {
                ship.speedY = newY;
            }
        }

        ship.x += ship.speedX;
        ship.y += ship.speedY;
    };

    checkPlayerColision = (player: Player) => {};

    destructor = () => {
        if (this.interval !== null) clearInterval(this.interval);
    };
}
