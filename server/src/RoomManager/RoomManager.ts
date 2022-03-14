import { Room } from "./Room";
import { User } from "../UserManager/User";
import { wihtoutItem } from "../utils/utils";

export class RoomManager {
    roomList: Room[] = [];

    addRoom = (name: string | Room) => {
        const room = isRoom(name) ? name : new Room(name);
        this.roomList.push(room);
    };

    removeRoom = (roomId: number | Room) => {
        const room = this.getRoom(roomId);
        if (room === undefined) return;

        room.users.forEach((p) => (p.room = null));
        this.roomList = wihtoutItem(this.roomList, room);
    };

    enterRoom = (roomId: number | Room, user: User) => {
        const room = this.getRoom(roomId);
        if (room === undefined) return;

        if (room.game !== null) {
        }

        if (user.room) {
            this.leaveRoom(user);
        }

        room.users.push(user);
        room.teamA.push(user);

        user.room = room;
    };

    leaveRoom = (user: User) => {
        const room = user.room;
        if (room === null) return;

        room.users = wihtoutItem(room.users, user);
        room.teamA = wihtoutItem(room.teamA, user);
        room.teamB = wihtoutItem(room.teamB, user);

        user.room = null;
    };

    switchTeam = (user: User, team: "A" | "B") => {
        if (user.room === null) return;

        if (team === "A") {
            if (user.room.teamA.includes(user)) return;

            user.room.teamB = wihtoutItem(user.room.teamB, user);
            user.room.teamA.push(user);
        } else {
            if (user.room.teamB.includes(user)) return;

            user.room.teamA = wihtoutItem(user.room.teamA, user);
            user.room.teamB.push(user);
        }
    };

    getRoom = (roomId: number | Room): Room | undefined => {
        return isRoom(roomId) ? roomId : this.roomList.find((r) => r.id === roomId);
    };
}

const isRoom = <T>(room: T | Room): room is Room => room instanceof Room;
