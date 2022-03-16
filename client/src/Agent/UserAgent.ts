import { SocketClient } from './SocketClient';

export class UserAgent {
    constructor(private socketClient: SocketClient) {}

    logout = () => {
        this.socketClient.socket.emit('logout');
    };

    userChangeName = (name: string) => {
        this.socketClient.socket.emit('userChangeName', name);
    };
}
