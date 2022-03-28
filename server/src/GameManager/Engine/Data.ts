import { Player } from '../Player/Player';
import { Team } from '../Team';

export class Data {
    players: Player[];
    islands: TIsland[] = [];
    wind: TWind = {
        angle: Math.random() * Math.PI * 2,
        strength: 1,
        speedX: 0,
        speedY: 0,
    };

    constructor(public teams: Team[]) {
        this.players = teams.flatMap((team) => team.players);
    }
}
