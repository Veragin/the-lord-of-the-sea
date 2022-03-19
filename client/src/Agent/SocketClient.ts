import { Socket, io } from 'socket.io-client';

export class SocketClient {
    userId: number = 0;
    isConnected = false;
    authToken?: string;
    socket: Socket;

    constructor() {
        console.log('SocketCLiet constructor');
        this.socket = io('ws://localhost:8001', { transports: ['websocket'] });

        this.register();
    }

    register = () => {
        this.socket.on('connect', () => {
            this.isConnected = true;

            if (this.authToken !== undefined) {
                // user was already connected (has authToken) => do reconnect
                console.log('Ws Reconnecting');
                this.socket.emit('login', undefined, this.authToken);
            }
        });

        this.socket.on('connect_error', (e) => {
            console.error('ws error', e);
        });

        this.socket.on('init', (userId: number, authToken: string) => {
            console.log('ws logged in:', userId, authToken, this.socket.id);
            this.userId = userId;
            this.authToken = authToken;
            this.onInit();
        });

        this.socket.on('close', () => {
            console.log('ws close');
            this.isConnected = false;
        });
    };

    onInit = () => {}; // on init callback
}
