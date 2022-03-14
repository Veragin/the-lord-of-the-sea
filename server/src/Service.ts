import { GameManager } from "GameManager/GamerManager";
import { RoomManager } from "RoomManager/RoomManager";
import { User } from "UserManager/User";
import { UserManager } from "UserManager/UserManager";
import { registerRoomEvents } from "RoomManager/registerRoomEvents";

export class Service {
    userManager = new UserManager();
    roomManager = new RoomManager();
    gameManager = new GameManager();

    registerEvents = (player: User) => {
        registerRoomEvents(player, this.roomManager, this.gameManager);
    };
}
