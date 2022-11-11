export class Ship {
    x: number = 0;
    y: number = 0;
    w: number = 100;
    h: number = 40;
    angle: TAngle = 0;

    speedX: number = 0;
    speedY: number = 0;

    rotate: TAngle = 0.75;
    acceleration: number = 25;
    maxSpeed: number = 60;

    health: number = 10;

    attackSpeed: number = 100;
    attackCooldown: number = 0;

    bulletDamage: number = 1;
    bulletSpeed: number = 100;
    bulletLiveTime: number = 5;

    mineSpeed: number = 1;
    mineCooldown: number = 0;
    mineIncome: number = 1;
}
