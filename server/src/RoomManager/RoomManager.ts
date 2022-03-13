import { Player } from "../PlayerManager/Player";
import { Room } from "./Room";
import { wihtoutItem } from "utils";

export class RoomManager {
    roomList: Room[] = [];

    addRoom = (name: string | Room) => {
        const room = isRoom(name) ? name : new Room(name);
        this.roomList.push(room);
    };

    removeRoom = (roomId: number | Room) => {
        const room = this.getRoom(roomId);
        if (room === undefined) return;

        room.players.forEach((p) => (p.room = null));
        this.roomList = wihtoutItem(this.roomList, room);
    };

    enterRoom = (roomId: number | Room, player: Player) => {
        const room = this.getRoom(roomId);
        if (room === undefined) return;

        if (player.room) {
            this.leaveRoom(player.room, player);
        }

        room.players.push(player);
        room.teamA.push(player);

        player.room = room;
    };

    leaveRoom = (roomId: number | Room, player: Player) => {
        const room = this.getRoom(roomId);
        if (room === undefined) return;

        room.players = wihtoutItem(room.players, player);
        room.teamA = wihtoutItem(room.teamA, player);
        room.teamB = wihtoutItem(room.teamB, player);

        player.room = null;
    };

    switchTeam = (player: Player, team: "A" | "B") => {
        if (player.room === null) return;

        if (team === "A") {
            if (player.room.teamA.includes(player)) return;

            player.room.teamB = wihtoutItem(player.room.teamB, player);
            player.room.teamA.push(player);
        } else {
            if (player.room.teamB.includes(player)) return;

            player.room.teamA = wihtoutItem(player.room.teamA, player);
            player.room.teamB.push(player);
        }
    };

    getRoom = (roomId: number | Room): Room | undefined => {
        return isRoom(roomId)
            ? roomId
            : this.roomList.find((r) => r.id === roomId);
    };
}

const isRoom = <T>(room: T | Room): room is Room => room instanceof Room;
