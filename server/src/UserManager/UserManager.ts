import { Socket } from "socket.io";
import { User } from "./User";

export class UserManager {
    userList: User[] = [];

    addUser = (socket: Socket) => {
        const user = new User(socket);
        this.userList.push(user);
        return user;
    };

    removeUser = (socketId: string) => {
        const user = this.userList.find((u) => u.socket.id === socketId);
        this.userList = this.userList.filter((u) => u.socket.id !== socketId);
    };

    getUserByAutToken = (authToken: string) => {
        return this.userList.find((u) => u.authToken === authToken);
    };

    getUserBySocketId = (socketId: string) => {
        return this.userList.find((u) => u.socket.id === socketId);
    };
}
