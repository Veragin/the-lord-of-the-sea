import { Socket } from "socket.io";

export class Agent {
    constructor(private socket: Socket) {}

    sendGameData = (data: any) => {
        this.socket.emit("gameData", data);
    };

    sendRoomData = (data: any) => {
        this.socket.emit("gameData", data);
    };

    sendMsg = (msg: string) => {
        this.socket.emit("msg", msg);
    };
}
