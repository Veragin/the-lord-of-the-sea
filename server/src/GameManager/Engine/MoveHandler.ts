import { Player } from '../Player/Player';
import { Ship } from '../Player/Ship';
import { Data } from './Data';
import { collisionArcRRect } from './Geometry';

export class MoveHandler {
    constructor(public data: Data) {}

    movePlayer = (player: Player) => {
        const control = player.control;
        const ship = player.ship;

        if (control.left) {
            ship.angle -= ship.rotate;
        }

        if (control.right) {
            ship.angle += ship.rotate;
        }

        const cosFront = Math.cos(ship.angle);
        const sinFront = Math.sin(ship.angle);

        if (control.forward) {
            ship.speedX += cosFront * ship.speed;
            ship.speedY += sinFront * ship.speed;
        }

        if (control.back) {
            const prevX = ship.speedX;
            const prevY = ship.speedY;

            const newX = ship.speedX - cosFront * ship.speed;
            const newY = ship.speedY - sinFront * ship.speed;

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

        this.checkMaxSpeed(player.ship);

        if (control.sail) {
            // can be higher than ship.maxSpeed
            ship.speedX += this.data.wind.speedX;
            ship.speedY += this.data.wind.speedY;
        }

        ship.x += ship.speedX;
        ship.y += ship.speedY;
    };

    checkMaxSpeed = (ship: Ship) => {
        const currSpeed = Math.abs(ship.speedX) + Math.abs(ship.speedY);
        if (currSpeed > ship.maxSpeed) {
            const correction = ship.maxSpeed / currSpeed;
            ship.speedX *= correction;
            ship.speedY *= correction;
        }
    };

    checkPlayerColision = (player: Player) => {
        this.checkIslandColision(player);
        this.checkBoundery(player);
    };

    private checkIslandColision = (player: Player) => {
        for (let island of this.data.map.islands) {
            if (collisionArcRRect(island, player.ship)) {
                player.ship.x = 0;
                player.ship.y = 0;
                return;
            }
        }
    };

    private checkBoundery = (player: Player) => {
        const w = this.data.map.width / 2;
        const h = this.data.map.height / 2;

        if (player.ship.x < -w) {
            player.ship.x = -w;
        } else if (player.ship.x > w) {
            player.ship.x = w;
        }

        if (player.ship.y < -h) {
            player.ship.y = -h;
        } else if (player.ship.y > h) {
            player.ship.y = h;
        }
    };
}
