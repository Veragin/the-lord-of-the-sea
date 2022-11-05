import { createItem } from '../../Const/Items';

import { Data } from './Data';
import { Player } from '../Player/Player';
import { MoveHandler } from './MoveHandler';

const ENGINE_INTERVAL_MS = 40;

export class Engine {
    interval: NodeJS.Timer | null = null;
    sendData: () => void = () => {};

    moveHandler: MoveHandler;

    constructor(private data: Data) {
        this.moveHandler = new MoveHandler(data);
    }

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
        this.moveHandler.movePlayer(player);
        this.moveHandler.checkPlayerColision(player);
        this.checkMine(player);
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
