import { Socket } from 'socket.io';

export class Agent {
    constructor(private socket: Socket) {}

    sendGameData = (data: TGameData) => {
        this.socket.emit('gameData', data);
    };

    sendRoomData = (data: TRoomData) => {
        this.socket.emit('roomData', data);
    };

    sendMsg = (msg: string) => {
        this.socket.emit('msg', msg);
    };

    gameInit = (data: TRoom) => {
        this.socket.emit('gameInit', data);
    };

    gameLoad = (data: TGameLoad) => {
        this.socket.emit('gameLoad', data);
    };

    gameStart = () => {
        this.socket.emit('gameStart');
    };
}
