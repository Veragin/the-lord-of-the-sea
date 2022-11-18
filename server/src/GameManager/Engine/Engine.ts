import { createItem } from '../../Const/Items';

import { Data } from './Data';
import { Player } from '../Player/Player';
import { MoveHandler } from './MoveHandler';
import { ENGINE_INTERVAL_MS } from './Const';
import { BulletHandler } from './BulletHandler';
import { DeltaTime, Time } from '../../utils/time';

export class Engine {
    interval: NodeJS.Timer | null = null;
    lastTime: Time = Time.fromMs(0);
    sendData: () => void = () => {};

    moveHandler: MoveHandler;
    bulletHandler: BulletHandler;

    constructor(private data: Data) {
        this.moveHandler = new MoveHandler(data);
        this.bulletHandler = new BulletHandler(data);
    }

    start = (sendData: () => void) => {
        this.sendData = sendData;
        this.lastTime = Time.now();
        this.interval = setInterval(this.run, ENGINE_INTERVAL_MS);
    };

    run = () => {
        const now = Time.now();
        const deltaTime = DeltaTime.distance(now, this.lastTime);
        this.lastTime = now;

        this.moveHandler.movePlayers(deltaTime);
        this.bulletHandler.process(now, deltaTime);
        this.processWind();
        this.processDeath();
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

    processDeath = () => {
        this.data.players.forEach((player) => {
            if (player.ship.health < 0) {
                player.ship.health = player.ship.maxHealth;
                player.ship.x = 0;
                player.ship.y = 0;
                player.ship.attackCooldown = Time.fromMs(0);
                player.ship.speedX = 0;
                player.ship.speedY = 0;
            }
        });
    };

    destructor = () => {
        if (this.interval !== null) clearInterval(this.interval);
    };
}
