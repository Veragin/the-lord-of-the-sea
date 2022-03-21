import { Engine } from '../Engine/Engine';
import { Game } from '../Game';
import { Player } from '../Player/Player';
import { Room } from 'src/RoomManager/Room';
import { Team } from '../Team';
import { User } from 'src/UserManager/User';

export const createGame = (room: Room): Game => {
    const teams = createTeams(room);

    const engine = new Engine(teams);
    const game = new Game(engine);
    room.game = game;

    return game;
};

const createTeams = (room: Room) => {
    const teams = [new Team('A'), new Team('B')];

    room.teamA.map((u) => {
        const player = new Player(u, teams[0]);
        teams[0].players.push(player);
    });

    room.teamB.map((u) => {
        const player = new Player(u, teams[1]);
        teams[1].players.push(player);
    });

    return teams;
};
