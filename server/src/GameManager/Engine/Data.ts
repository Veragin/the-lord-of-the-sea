import { Player } from '../Player/Player';
import { Team } from '../Team';

export class Data {
    players: Player[];

    constructor(public teams: Team[]) {
        this.players = teams.flatMap((team) => team.players);
    }
}
