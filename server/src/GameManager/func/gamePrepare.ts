import { Game } from '../Game';
import { Room } from '../../RoomManager/Room';
import { createGame } from './createGame';
import { registerGameEvents } from './registerGameEvents';

export const gamePrepare = async (room: Room) => {
    await clientGameInit(room);

    const game = createGame(room);

    registerGameEvents(game.players);

    await clientGameLoad(game);

    return game;
};

const clientGameInit = (room: Room) => {
    return new Promise((resolve) => {
        const users = room.users;

        users.forEach((u) => {
            const onInitDone = () => {
                u.state = 'gameInitDone';
                u.socket.off('gameInitDone', onInitDone);
                if (users.every((u) => u.state === 'gameInitDone')) {
                    resolve(true);
                }
            };
            u.socket.on('gameInitDone', onInitDone);
        });

        const data = room.export();
        users.forEach((u) => u.agent.gameInit(data));
    });
};

const clientGameLoad = async (game: Game) => {
    return new Promise((resolve) => {
        const users = game.room.users;

        users.forEach((u) => {
            const onLoadDone = () => {
                u.state = 'gameLoadDone';
                u.socket.off('gameLoadDone', onLoadDone);
                if (users.every((u) => u.state === 'gameLoadDone')) {
                    resolve(true);
                }
            };
            u.socket.on('gameLoadDone', onLoadDone);
        });

        const data = game.export();
        users.forEach((u) => u.agent.sendGameData(data));
    });
};
