import { Player } from '../Player/Player';
import { Team } from '../Team';
import { Map } from '../Map';
import { TBullet } from './BulletHandler';

export class Data {
    players: Player[];
    bullets: TBullet[] = [];
    wind: TWind = {
        angle: Math.random() * Math.PI * 2,
        strength: 1,
        speedX: 0,
        speedY: 0,
    };

    constructor(public teams: Team[], public map: Map) {
        this.players = teams.flatMap((team) => team.players);
    }
}
