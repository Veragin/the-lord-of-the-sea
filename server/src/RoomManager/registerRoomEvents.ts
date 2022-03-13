import { Player } from "PlayerManager/Player";
import { RoomManager } from "./RoomManager";

export const registerRoomEvents = (
    player: Player,
    roomManager: RoomManager
) => {
    player.socket.on("roomAdd", (name) => {
        roomManager.addRoom(name ?? "Noname room");
    });

    player.socket.on("roomRemove", (roomId) => {
        roomManager.removeRoom(roomId);
    });

    player.socket.on("roomEnter", (roomId) => {
        roomManager.removeRoom(roomId);
    });
};
