import { createItem } from '../../Const/Items';

import { Data } from './Data';
import { Player } from '../Player/Player';
import { MoveHandler } from './MoveHandler';
import { ENGINE_INTERVAL_MS } from './Const';
import { BulletHandler } from './BulletHandler';

export class Engine {
    interval: NodeJS.Timer | null = null;
    lastUpdateMs: number = 0;
    sendData: () => void = () => {};

    moveHandler: MoveHandler;
    bulletHandler: BulletHandler;

    constructor(private data: Data) {
        this.moveHandler = new MoveHandler(data);
        this.bulletHandler = new BulletHandler(data);
    }

    start = (sendData: () => void) => {
        this.sendData = sendData;
        this.lastUpdateMs = Date.now();
        this.interval = setInterval(this.run, ENGINE_INTERVAL_MS);
    };

    run = () => {
        const now = Date.now();
        const deltaTime = (now - this.lastUpdateMs) / 1_000;
        this.lastUpdateMs = now;

        this.moveHandler.movePlayers(deltaTime);
        this.bulletHandler.process(deltaTime);
        this.processWind();
        this.sendData();
    };

    processWind = () => {
        if (Math.random() < 0.005) {
            this.data.wind.angle += Math.random() - 0.5;
            this.data.wind.strength = (1 + Math.random()) * 20;

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
