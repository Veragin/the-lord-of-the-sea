export class Ship {
    x: number = 0;
    y: number = 0;
    w: number = 100;
    h: number = 40;
    angle: TAngle = 0;

    speedX: number = 0;
    speedY: number = 0;

    weight: number = 1;

    rotate: TAngle = 0.75;
    acceleration: number = 2.1;
    maxSpeed: number = 4;

    attackSpeed: number = 1;
    attackCooldown: number = 0;
    attackDamage: number = 1;

    mineSpeed: number = 1;
    mineCooldown: number = 0;
    mineIncome: number = 1;
}
