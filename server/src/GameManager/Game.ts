import { Data } from './Engine/Data';
import { Engine } from './Engine/Engine';
import { Room } from '../RoomManager/Room';
import { generateId } from '../utils/utils';

export class Game {
    id = generateId();

    constructor(public room: Room, public data: Data, public engine: Engine) {}

    sendGameInfo = () => {
        const data = this.createGameData();
        this.data.players.forEach((p) => p.user.agent.sendGameData(data));
    };

    createGameData = (): TGameData => ({
        players: this.data.players.map((p) => ({
            id: p.user.id,
            x: p.ship.x,
            y: p.ship.y,
            front: p.ship.front,
        })),
    });

    start = () => {
        this.room.users.forEach((u) => u.agent.gameStart());
        this.engine.start(this.sendGameInfo);
    };
}
