import { SocketClient } from './SocketClient';

export class RoomAgent {
    constructor(private socketClient: SocketClient) {}

    addRoom = (name: string) => {
        this.socketClient.socket.emit('roomAdd', name);
    };

    removeRoom = (roomId: number) => {
        this.socketClient.socket.emit('roomRemove', roomId);
    };

    enterRoom = (roomId: number) => {
        this.socketClient.socket.emit('roomEnter', roomId);
    };

    leaveRoom = () => {
        this.socketClient.socket.emit('roomLeave');
    };

    teamSwitch = (team: TUserTeam) => {
        this.socketClient.socket.emit('roomSwitch', team);
    };

    startRoom = () => {
        this.socketClient.socket.emit('roomStart');
    };
}
