import { Engine } from './Engine/Engine';
import { Room } from '../RoomManager/Room';
import { generateId } from '../utils/utils';

export class Game {
    id = generateId();

    constructor(public room: Room, public engine: Engine) {}

    sendGameInfo = () => {
        const data = this.room.users.map(u => u.player.)
        this.room.users
    }
}
