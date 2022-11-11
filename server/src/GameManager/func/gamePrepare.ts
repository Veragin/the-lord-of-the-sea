import { registerGameEvents, registerGameEventsForPlayer } from './registerGameEvents';

import { Game } from '../Game';
import { Room } from '../../RoomManager/Room';
import { User } from 'UserManager/User';
import { createGame } from './createGame';

/** When the game is starting */
export const gamePrepare = async (room: Room) => {
    await gameInit(room);

    const game = createGame(room);

    registerGameEvents(game.data.players);

    await gameLoad(game);

    return game;
};

/** When user is reconnected to the game */
export const connectUserToHisGame = async (user: User) => {
    const room = user.room;
    const game = room?.game;
    const player = game?.data.players.find((p) => p.user.id === user.id);
    if (!room || !game || !player) return;

    console.log('connecting player to his game', user.socket.id);

    const initData = room.export();
    await userGameInit(user, initData);

    registerGameEventsForPlayer(player);

    const loadGameData = createGameLoadData(game);
    await userGameLoad(user, loadGameData);

    user.agent.gameStart();
};

/*****************************************************************************
 ******** Game init
 *****************************************************************************/

const gameInit = async (room: Room) => {
    const users = room.users;
    const data = room.export();

    const promises = users.map((u) => userGameInit(u, data));
    await Promise.all(promises);
};

const userGameInit = (user: User, data: TRoom) => {
    return new Promise((resolve) => {
        const onInitDone = () => {
            user.state = 'gameInitDone';
            user.socket.off('gameInitDone', onInitDone);
            console.log('gameInitDone off ', user.socket.id);
            resolve(true);
        };
        user.socket.on('gameInitDone', onInitDone);

        console.log('gameInitDone emit', user.socket.id);
        user.agent.gameInit(data);
    });
};

/*****************************************************************************
 ******** Game load
 *****************************************************************************/

const gameLoad = async (game: Game) => {
    const users = game.room.users;
    const data = createGameLoadData(game);

    const promises = users.map((u) => userGameLoad(u, data));
    await Promise.all(promises);
};

const createGameLoadData = (game: Game): TGameLoad => {
    return {
        data: game.createGameData(),
        users: game.room.users.map((u) => ({ id: u.id, name: u.name })),
        map: {
            islands: game.data.map.islands.map((i) => ({ ...i })),
            width: game.data.map.width,
            height: game.data.map.height,
        },
        wind: { angle: game.data.wind.angle, strength: game.data.wind.strength },
    };
};

const userGameLoad = (user: User, data: TGameLoad) => {
    return new Promise((resolve) => {
        const onInitDone = () => {
            user.state = 'gameLoadDone';
            user.socket.off('gameLoadDone', onInitDone);
            resolve(true);
        };
        user.socket.on('gameLoadDone', onInitDone);

        user.agent.gameLoad(data);
    });
};
