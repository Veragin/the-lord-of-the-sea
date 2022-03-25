import { Player } from '../Player/Player';
import { Team } from '../Team';

export class Data {
    players: Player[];
    islands: TIsland[] = [];

    constructor(public teams: Team[]) {
        this.players = teams.flatMap((team) => team.players);
    }
}
