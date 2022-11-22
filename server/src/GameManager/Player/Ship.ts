import { DeltaTime, Time } from '../../utils/time';

export class Ship {
    x: number = 0;
    y: number = 0;
    w: number = 100;
    h: number = 40;
    angle: TAngle = 0;

    speedX: number = 0;
    speedY: number = 0;

    rotate: TAngle = 0.75;
    acceleration: number = 30;
    maxSpeed: number = 80;

    maxHealth: number = 10;
    health: number = 10;

    attackSpeed = DeltaTime.fromS(1.5);
    attackCooldown = Time.fromMs(0);

    bulletDamage: number = 1;
    bulletSpeed: number = 100;
    bulletLiveTime = DeltaTime.fromS(5);

    mineSpeed = DeltaTime.fromS(1);
    mineCooldown = Time.fromMs(0);
    mineIncome: number = 1;
}
