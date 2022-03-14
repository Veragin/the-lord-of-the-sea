import { GameManager } from "GameManager/GamerManager";
import { RoomManager } from "RoomManager/RoomManager";
import { User } from "UserManager/User";
import { UserManager } from "UserManager/UserManager";
import { registerRoomEvents } from "RoomManager/registerRoomEvents";
import { registerUserEvents } from "UserManager/registerUserEvents";

export class Service {
    userManager = new UserManager();
    roomManager = new RoomManager(() => this.sendsRoomChange());
    gameManager = new GameManager();

    registerEvents = (user: User) => {
        registerUserEvents(user);
        registerRoomEvents(user, this.roomManager, this.gameManager);
    };

    sendsRoomChange = () => {
        const usersNotInGame = this.userManager.userList.filter((u) => !u.player);
        const data: TRoomData = {
            players: this.userManager.userList.map((u) => ({ id: u.id, name: u.name })),
            rooms: this.roomManager.roomList.map((r) => ({
                id: r.id,
                name: r.name,
                inGame: !!r.game,
                teamA: r.teamA.map((p) => p.id),
                teamB: r.teamB.map((p) => p.id),
            })),
        };

        usersNotInGame.forEach((u) => u.agent.sendRoomData(data));
    };
}
