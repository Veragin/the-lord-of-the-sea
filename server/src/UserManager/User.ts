import { Agent } from './Agent';
import { Room } from '../RoomManager/Room';
import { Socket } from 'socket.io';
import { generateId } from '../utils/utils';

export class User {
    id: number = generateId();
    name: string = `User ${this.id}`;
    state: TUserState = 'inRoom';

    authToken = 'DUMMY_AUTH'; ///uuid();
    isConnected = true;

    room: Room | null = null;

    agent: Agent;

    constructor(public socket: Socket, name?: string) {
        if (name) this.name = name;
        this.agent = new Agent(socket);
    }

    setSocket = (socket: Socket) => {
        this.socket = socket;
        this.agent = new Agent(socket);
    };
}
