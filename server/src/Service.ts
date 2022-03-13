import { PlayerManager } from "PlayerManager/PlayerManager";
import { RoomManager } from "RoomManager/RoomManager";

export class Service {
    playerManager = new PlayerManager();
    roomManager = new RoomManager();
}
