import { createItem } from '../../Const/Items';

import { Data } from './Data';
import { Player } from '../Player/Player';
import { MoveHandler } from './MoveHandler';
import { ENGINE_INTERVAL_MS } from './Const';

export class Engine {
    interval: NodeJS.Timer | null = null;
    lastUpdateMs: number = 0;
    sendData: () => void = () => {};

    moveHandler: MoveHandler;

    constructor(private data: Data) {
        this.moveHandler = new MoveHandler(data);
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

        this.data.players.forEach((p) => {
            this.processPlayer(p, deltaTime);
        });
        this.processWind(deltaTime);
        this.sendData();
    };

    processPlayer = (player: Player, deltaTime: number) => {
        this.moveHandler.movePlayer(player, deltaTime);
        this.moveHandler.checkPlayerColision(player);
        this.checkMine(player);
    };

    processWind = (deltaTime: number) => {
        if (Math.random() < 0.05) {
            this.data.wind.angle += Math.random() - 0.5;
            this.data.wind.strength = 0.5 + Math.random();

            this.data.wind.speedX = Math.cos(this.data.wind.angle) * this.data.wind.strength * deltaTime;
            this.data.wind.speedY = Math.sin(this.data.wind.angle) * this.data.wind.strength * deltaTime;
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
