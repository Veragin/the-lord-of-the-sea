import { Player } from './Player/Player';

export class Team {
    players: Player[] = [];

    constructor(public key: TUserTeam) {}
}
