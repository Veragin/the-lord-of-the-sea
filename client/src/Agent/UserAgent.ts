import { SocketClient } from './SocketClient';

export class UserAgent {
    constructor(private socketClient: SocketClient) {}

    logout = () => {
        this.socketClient.socket.emit('logout');
    };

    login = (name: string) => {
        return new Promise((resolve) => {
            this.socketClient.onInit = () => resolve(true);
            this.socketClient.socket.emit('login', name, this.socketClient.authToken);
        });
    };

    userChangeName = (name: string) => {
        console.log('changeNmae', name, this.socketClient.socket.id);
        this.socketClient.socket.emit('userChangeName', name);
    };
}
