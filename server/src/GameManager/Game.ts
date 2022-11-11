import { Data } from './Engine/Data';
import { Engine } from './Engine/Engine';
import { Room } from '../RoomManager/Room';
import { generateId } from '../utils/utils';

export class Game {
    id = generateId();

    constructor(public room: Room, public data: Data, public engine: Engine) {}

    sendGameInfo = () => {
        const data = this.createGameData();
        this.data.players.filter((p) => p.user.isConnected).forEach((p) => p.user.agent.sendGameData(data));
    };

    createGameData = (): TGameData => ({
        players: this.data.players.map((p) => ({
            id: p.user.id,
            x: p.ship.x,
            y: p.ship.y,
            angle: p.ship.angle,
            sail: p.control.sail,
        })),
        wind: {
            angle: this.data.wind.angle,
            strength: this.data.wind.strength,
        },
        bullets: this.data.bullets.map((b) => ({ x: b.x, y: b.y })),
    });

    start = () => {
        this.room.users.forEach((u) => u.agent.gameStart());
        this.engine.start(this.sendGameInfo);
    };

    destructor = () => {
        this.engine.destructor();
    };
}
