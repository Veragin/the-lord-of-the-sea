import { Agent } from './Agent';
import { Room } from '../RoomManager/Room';
import { Socket } from 'socket.io';
import { generateId } from '../utils/utils';
import { v4 as uuid } from 'uuid';

export class User {
    id: number = generateId();
    name: string = `User ${this.id}`;
    state: TUserState = 'inRoom';

    authToken = 'DUMMY_AUTH'; ///uuid();
    isConnected = true;

    room: Room | null = null;

    constructor(public socket: Socket, public agent: Agent, name?: string) {
        if (name) this.name = name;
    }

    setSocket = (socket: Socket) => {
        this.socket = socket;
        this.agent = new Agent(socket);
    };
}
