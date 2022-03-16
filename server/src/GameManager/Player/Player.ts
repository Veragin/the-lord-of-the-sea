import { Ship } from './Ship';

export class Player {
    control = {
        // movement
        left: false,
        right: false,
        forward: false,
        back: false,

        sail: false,
        fire: false,
    };

    ship = new Ship();

    constructor() {}
}
