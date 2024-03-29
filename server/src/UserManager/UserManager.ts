import { Agent } from './Agent';
import { Socket } from 'socket.io';
import { User } from './User';

export class UserManager {
    userList: User[] = [];

    constructor(private onChange: () => void) {}

    addUser = (socket: Socket, name?: string) => {
        const user = new User(socket, name);
        this.userList.push(user);
        this.onChange();
        return user;
    };

    removeUser = (socketId: string) => {
        this.userList = this.userList.filter((u) => u.socket.id !== socketId);
        this.onChange();
    };

    getUserByAutToken = (authToken?: string) => {
        return this.userList.find((u) => u.authToken === authToken);
    };

    getUserBySocketId = (socketId: string) => {
        return this.userList.find((u) => u.socket.id === socketId);
    };
}
