import { Player } from 'GameManager/Player/Player';
import { Ship } from 'GameManager/Player/Ship';
import { Data } from './Data';
import { collisionPointArc, collisionPointRRect, getNorm } from './Geometry';

export type TBullet = TPoint & {
    speedX: number;
    speedY: number;
    damage: number;
    liveTime: number;
    ship: Ship;
};

export class BulletHandler {
    constructor(private data: Data) {}

    process(deltaTime: number) {
        this.data.players.forEach((p) => {
            this.shipFire(p, deltaTime);
        });

        this.data.bullets.forEach((b) => {
            b.liveTime -= deltaTime;
            this.bulletMove(b, deltaTime);
            this.checkBulletCollision(b);
        });
        this.data.bullets = this.data.bullets.filter((b) => b.liveTime > 0);
    }

    private shipFire = (player: Player, deltaTime: number) => {
        const ship = player.ship;

        if (ship.attackCooldown > 0) {
            ship.attackCooldown = -deltaTime;
            return;
        }

        const fire = player.control.fire;
        if (fire !== null) {
            ship.attackCooldown = ship.attackSpeed;
            this.fire(player.ship, fire);
        }
    };

    private fire = (ship: Ship, fire: Exclude<TBulletFire, null>) => {
        const axis = { x: ship.x - fire.x, y: ship.y - fire.y };
        const norm = getNorm(axis);

        this.data.bullets.push({
            x: ship.x,
            y: ship.y,
            damage: ship.bulletDamage,
            speedX: ship.speedX + (axis.x / norm) * ship.bulletSpeed,
            speedY: ship.speedY + (axis.y / norm) * ship.bulletSpeed,
            liveTime: ship.bulletLiveTime,
            ship,
        });
    };

    private bulletMove = (bullet: TBullet, deltaTime: number) => {
        bullet.x += bullet.speedX /*+ this.data.wind.speedX*/ * deltaTime;
        bullet.y += bullet.speedY /*+ this.data.wind.speedY*/ * deltaTime;
    };

    private checkBulletCollision = (bullet: TBullet) => {
        for (let player of this.data.players) {
            if (bullet.ship !== player.ship && collisionPointRRect(bullet, player.ship)) {
                player.ship.health -= bullet.damage;
                bullet.liveTime = 0;
                return;
            }
        }

        for (let island of this.data.map.islands) {
            if (collisionPointArc(bullet, island)) {
                bullet.liveTime = 0;
                return;
            }
        }
    };
}
