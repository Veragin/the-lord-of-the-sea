import { Game } from './Game';
import { Room } from 'RoomManager/Room';

export class GameManager {
    gameList: Game[] = [];

    addGame = (room: Room) => {
        const game = new Game(room);
        this.gameList.push(game);
    };

    removeGame = (gameId: number) => {};
}
