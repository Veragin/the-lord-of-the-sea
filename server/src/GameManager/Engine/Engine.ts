import { collisionArcRRect, collisionArcRect } from './Geometry';
import { createItem, itemList } from '../../Const/Items';

import { Data } from './Data';
import { Player } from '../Player/Player';
import { Ship } from '../Player/Ship';
import { generateId } from '../../utils/utils';

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
        this.processWind();
        this.sendData();
    };

    processPlayer = (player: Player) => {
        this.movePlayer(player);
        this.checkPlayerColision(player);
        this.checkMine(player);
    };

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
        for (let island of this.data.islands) {
            if (collisionArcRRect(island, player.ship)) {
                player.ship.x = 0;
                player.ship.y = 0;
                break;
            }
        }
    };

    processWind = () => {
        if (Math.random() < 0.005) {
            this.data.wind.angle += Math.random() - 0.5;
            this.data.wind.strength = 0.5 + Math.random();

            this.data.wind.speedX = Math.cos(this.data.wind.angle) * this.data.wind.strength;
            this.data.wind.speedY = Math.sin(this.data.wind.angle) * this.data.wind.strength;
        }
    };

    checkMine = (player: Player) => {
        if (player.control.mine) {
            if (player.ship.mineCooldown < player.ship.mineSpeed) {
                player.ship.mineCooldown += 0.05;
            } else {
                player.inventory.add([createItem('stone')]);
                player.ship.mineCooldown = 0;
            }
        }
    };

    destructor = () => {
        if (this.interval !== null) clearInterval(this.interval);
    };
}
