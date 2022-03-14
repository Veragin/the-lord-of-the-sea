import { Socket, io } from "socket.io-client";

export class SocketClient {
    isConnected = false;
    authToken?: string;
    socket: Socket;

    constructor() {
        this.socket = io("ws://localhost:8001");

        this.socket.on("connect", () => {
            this.isConnected = true;
            this.socket.emit("login", this.authToken);
        });

        this.socket.on("authToken", (authToken: string) => {
            this.authToken = authToken;
        });

        this.socket.on("close", () => {
            this.isConnected = false;
        });
    }
}
