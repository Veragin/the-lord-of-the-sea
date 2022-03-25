import { Data } from '../Engine/Data';
import { Engine } from '../Engine/Engine';
import { Game } from '../Game';
import { Player } from '../Player/Player';
import { Room } from 'src/RoomManager/Room';
import { Team } from '../Team';

export const createGame = (room: Room): Game => {
    const teams = createTeams(room);

    const data = new Data(teams);
    data.islands = createIslands();

    const engine = new Engine(data);
    const game = new Game(room, data, engine);
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

const createIslands = (): TIsland[] => {
    return [
        {
            x: 200,
            y: 200,
            w: 50,
            h: 50,
        },
        {
            x: -400,
            y: -200,
            w: 200,
            h: 40,
        },
        {
            x: -200,
            y: 400,
            w: 30,
            h: 100,
        },
        {
            x: 200,
            y: -200,
            w: 10,
            h: 10,
        },
    ];
};
