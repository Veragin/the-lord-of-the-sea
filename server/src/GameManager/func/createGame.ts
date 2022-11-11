import { Data } from '../Engine/Data';
import { Engine } from '../Engine/Engine';
import { Game } from '../Game';
import { Player } from '../Player/Player';
import { Room } from 'RoomManager/Room';
import { Team } from '../Team';
import { Map } from '../Map';

export const createGame = (room: Room): Game => {
    const teams = createTeams(room);

    const map = createMap();
    const data = new Data(teams, map);

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

const createMap = (): Map => {
    const map = new Map();
    map.islands = createIslands();
    return map;
};

const createIslands = (): TIsland[] => {
    return [
        {
            x: 200,
            y: 200,
            r: 50,
        },
        {
            x: -400,
            y: -200,
            r: 200,
        },
        {
            x: -200,
            y: 400,
            r: 40,
        },
        {
            x: 200,
            y: -200,
            r: 100,
        },
    ];
};
