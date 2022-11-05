import { Game } from './Game';
import { Room } from '../RoomManager/Room';
import { gamePrepare } from './func/gamePrepare';

export class GameManager {
    gameList: Game[] = [];

    addNewGame = async (room: Room) => {
        const game = await gamePrepare(room);
        this.gameList.push(game);
        game.start();
    };

    removeGame = (gameId: number) => {
        const game = this.gameList.find((game) => game.id === gameId);
        if (game === undefined) return;

        game.destructor();
        this.gameList = this.gameList.filter((game) => game.id !== gameId);
    };
}
