import { Player } from 'GameManager/Player/Player';
import { Ship } from 'GameManager/Player/Ship';
import { DeltaTime, Time } from '../../utils/time';
import { Data } from './Data';
import { collisionPointArc, collisionPointRRect, normalize } from './Geometry';

export type TBullet = TPoint & {
    speedX: number;
    speedY: number;
    damage: number;
    liveTime: Time;
    ship: Ship;
};

export class BulletHandler {
    constructor(private data: Data) {}

    process(now: Time, deltaTime: DeltaTime) {
        this.data.players.forEach((p) => {
            this.shipFire(p, now);
        });

        this.data.bullets.forEach((b) => {
            this.bulletMove(b, deltaTime);
            this.checkBulletCollision(b);
        });
        this.data.bullets = this.data.bullets.filter((b) => b.liveTime.isAfter(now));
    }

    private shipFire = (player: Player, now: Time) => {
        const ship = player.ship;

        if (ship.attackCooldown > now) {
            return;
        }

        const fire = player.control.fire;
        if (fire !== null) {
            ship.attackCooldown = now.moveToFutureBy(ship.attackSpeed);
            this.fire(player.ship, fire, now);
        }
    };

    private fire = (ship: Ship, fire: Exclude<TBulletFire, null>, now: Time) => {
        const axis = normalize(fire);

        this.data.bullets.push({
            x: ship.x,
            y: ship.y,
            damage: ship.bulletDamage,
            speedX: ship.speedX + axis.x * ship.bulletSpeed,
            speedY: ship.speedY + axis.y * ship.bulletSpeed,
            liveTime: now.moveToFutureBy(ship.bulletLiveTime),
            ship,
        });
    };

    private bulletMove = (bullet: TBullet, deltaTime: DeltaTime) => {
        bullet.x += (bullet.speedX + this.data.wind.speedX) * deltaTime.ms;
        bullet.y += (bullet.speedY + this.data.wind.speedY) * deltaTime.ms;
    };

    private checkBulletCollision = (bullet: TBullet) => {
        for (let player of this.data.players) {
            if (bullet.ship !== player.ship && collisionPointRRect(bullet, player.ship)) {
                player.ship.health -= bullet.damage;
                bullet.liveTime = Time.fromMs(0);
                return;
            }
        }

        for (let island of this.data.map.islands) {
            if (collisionPointArc(bullet, island)) {
                bullet.liveTime = Time.fromMs(0);
                return;
            }
        }
    };
}
