import { EventRegister } from '../Agent/EventRegister';
import { GameAgent } from '../Agent/GameAgent';
import { RoomAgent } from '../Agent/RoomAgent';
import { SocketClient } from '../Agent/SocketClient';
import { User } from './User';
import { UserAgent } from '../Agent/UserAgent';

export const createUser = () => {
    const socketClient = new SocketClient();
    const gameAgent = new GameAgent(socketClient);
    const userAgent = new UserAgent(socketClient);
    const roomAgent = new RoomAgent(socketClient);
    const eventRegister = new EventRegister(socketClient);
    console.log('create user');

    return new User(socketClient, gameAgent, userAgent, roomAgent, eventRegister);
};
