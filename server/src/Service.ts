import { GameManager } from './GameManager/GamerManager';
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
        registerRoomEvents(user, this.roomManager, this.gameManager);
    };

    sendsRoomChange = (user?: User) => {
        const usersNotInGame = this.userManager.userList.filter((u) => !u.player);
        const data: TRoomData = {
            users: this.userManager.userList.map((u) => ({ id: u.id, name: u.name })),
            rooms: this.roomManager.roomList.map((r) => ({
                id: r.id,
                name: r.name,
                inGame: !!r.game,
                teamA: r.teamA.map((p) => p.id),
                teamB: r.teamB.map((p) => p.id),
            })),
        };

        if (user) {
            user.agent.sendRoomData(data);
        } else {
            usersNotInGame.forEach((u) => u.agent.sendRoomData(data));
        }
    };
}
