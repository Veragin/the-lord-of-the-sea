import { Data } from './Data';

export type TBullet = TPoint & {
    speedX: number;
    speedY: number;
    damage: number;
};

export class BulletHandler {
    constructor(private data: Data) {}
}
