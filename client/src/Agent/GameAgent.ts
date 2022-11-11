import { SocketClient } from './SocketClient';

export class GameAgent {
    constructor(private socketClient: SocketClient) {}

    turnLeft = (on: boolean) => {
        this.socketClient.socket.emit('gameLeft', on);
    };

    turnRight = (on: boolean) => {
        this.socketClient.socket.emit('gameRight', on);
    };

    moveForward = (on: boolean) => {
        this.socketClient.socket.emit('gameForward', on);
    };

    moveBack = (on: boolean) => {
        this.socketClient.socket.emit('gameBack', on);
    };

    doSail = (on: boolean) => {
        this.socketClient.socket.emit('gameSail', on);
    };

    doFire = (fire: TBulletFire) => {
        this.socketClient.socket.emit('gameFire', fire);
    };

    initDone = () => {
        this.socketClient.socket.emit('gameInitDone');
    };

    laodDone = () => {
        this.socketClient.socket.emit('gameLoadDone');
    };
}
