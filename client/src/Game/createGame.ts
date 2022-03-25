import { Game } from './Game';
import { User } from '../User/User';

export const createGame = (room: TRoom, user: User, canvas: HTMLCanvasElement, onStart: () => void) => {
    const game = new Game(user, canvas);

    console.log('game created', game);

    const loadId = user.eventRegister.subscribe({
        type: 'gameLoad',
        do: async (loadData) => {
            await game.init(room, loadData);
            user.gameAgent.laodDone();
            user.eventRegister.unsubscribe('gameLoad', loadId);
        },
    });

    const startId = user.eventRegister.subscribe({
        type: 'gameStart',
        do: () => {
            onStart();
            user.eventRegister.unsubscribe('gameStart', startId);
        },
    });

    // game is ready
    user.gameAgent.initDone();

    return game;
};
