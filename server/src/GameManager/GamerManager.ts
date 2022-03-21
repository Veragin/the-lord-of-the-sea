import { Game } from './Game';
import { Room } from '../RoomManager/Room';

export class GameManager {
    gameList: Game[] = [];

    addGame = (game: Game) => {
        this.gameList.push(game);
    };

    removeGame = (gameId: number) => {};
}
