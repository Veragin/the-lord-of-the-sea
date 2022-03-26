import { connectUserToHisGame, gamePrepare } from './GameManager/func/gamePrepare';

import { GameManager } from './GameManager/GamerManager';
import { Room } from './RoomManager/Room';
import { RoomManager } from './RoomManager/RoomManager';
import { User } from './UserManager/User';
import { UserManager } from './UserManager/UserManager';
import { registerRoomEvents } from './RoomManager/registerRoomEvents';
import { registerUserEvents } from './UserManager/registerUserEvents';

export class Service {
    userManager = new UserManager(() => this.sendsRoomChange());
    roomManager = new RoomManager(() => this.sendsRoomChange());
    gameManager = new GameManager();

    registerEvents = (user: User) => {
        registerUserEvents(user, () => this.sendsRoomChange());
        registerRoomEvents(user, this.roomManager, this.startGame);
    };

    sendsRoomChange = (user?: User) => {
        const usersNotInGame = this.userManager.userList.filter((u) => u.state === 'inRoom');
        const data: TRoomData = {
            users: this.userManager.userList.map((u) => ({ id: u.id, name: u.name })),
            rooms: this.roomManager.roomList.map((r) => r.export()),
        };

        if (user) {
            user.agent.sendRoomData(data);
        } else {
            usersNotInGame.forEach((u) => u.agent.sendRoomData(data));
        }
    };

    startGame = async (room: Room) => {
        const game = await gamePrepare(room);
        this.gameManager.addGame(game);
        game.start();
    };

    reconnectUserToHisGame = (user: User) => {
        connectUserToHisGame(user);
    };
}
