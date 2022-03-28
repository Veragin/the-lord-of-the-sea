export class Ship {
    x: number = 0;
    y: number = 0;
    w: number = 100;
    h: number = 40;
    angle: TAngle = 0;

    speedX: number = 0;
    speedY: number = 0;

    weight: number = 1;

    rotate: TAngle = 0.03;
    speed: number = 0.1;
    maxSpeed: number = 5;

    attackSpeed: number = 1;
    attackCooldown: number = 0;
    attackDamage: number = 1;
}
