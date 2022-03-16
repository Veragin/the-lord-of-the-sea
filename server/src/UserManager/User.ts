import { Agent } from './Agent';
import { Player } from 'GameManager/Player/Player';
import { Room } from 'RoomManager/Room';
import { Socket } from 'socket.io';
import { generateId } from '../utils/utils';

export class User {
    id: number = generateId();
    name: string = `User ${this.id}`;

    authToken = 'sss';
    isConnected = true;

    room: Room | null = null;
    player: Player | null = null;

    constructor(public socket: Socket, public agent: Agent) {}
}
