export class Ship {
    x: number = 0;
    y: number = 0;
    w: number = 40;
    h: number = 100;

    speedX: number = 0;
    speedY: number = 0;

    angle: TAngle = 0;
    weight: number = 1;

    rotate: TAngle = 0.03;
    speed: number = 0.1;
    maxSpeed: number = 1;
}
