import { Player } from "./Player";
import { Socket } from "socket.io";

export class PlayerManager {
    playerList: Player[] = [];

    addPlayer = (socket: Socket) => {
        this.playerList.push(new Player(socket));
    };

    removePlayer = (socketId: string) => {
        const player = this.playerList.find((p) => p.socket.id === socketId);
        this.playerList = this.playerList.filter(
            (p) => p.socket.id !== socketId
        );
    };
}
