import { Room } from "RoomManager/Room";
import { Socket } from "socket.io";
import { generateId } from "../utils";

export class Player {
    id: number = generateId();
    name: string = `Player ${this.id}`;
    room: Room | null = null;

    constructor(public socket: Socket) {}
}
