import { Ship } from './Ship';
import { Team } from '../Team';
import { User } from 'src/UserManager/User';

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

    constructor(public user: User, public team: Team) {}
}
