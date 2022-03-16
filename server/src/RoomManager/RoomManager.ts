import { Room } from './Room';
import { User } from '../UserManager/User';
import { wihtoutItem } from '../utils/utils';

export class RoomManager {
    roomList: Room[] = [];

    constructor(private onChange: () => void) {}

    addRoom = (name: string | Room) => {
        const room = isRoom(name) ? name : new Room(name);
        this.roomList.push(room);
        this.onChange();
    };

    removeRoom = (roomId: number | Room) => {
        const room = this.getRoom(roomId);
        if (room === undefined) return;

        room.users.forEach((p) => (p.room = null));
        this.roomList = wihtoutItem(this.roomList, room);
        this.onChange();
    };

    enterRoom = (roomId: number | Room, user: User) => {
        const room = this.getRoom(roomId);
        if (room === undefined) return;

        if (room.game !== null) {
            user.agent.sendMsg('The room has already started.');
            return;
        }

        if (user.room) {
            this.leaveRoom(user);
        }

        room.users.push(user);
        room.teamA.push(user);

        user.room = room;
        this.onChange();
    };

    leaveRoom = (user: User) => {
        const room = user.room;
        if (room === null) return;

        room.users = wihtoutItem(room.users, user);
        room.teamA = wihtoutItem(room.teamA, user);
        room.teamB = wihtoutItem(room.teamB, user);

        user.room = null;
        this.onChange();
    };

    switchTeam = (user: User, team: 'A' | 'B') => {
        if (user.room === null) return;

        if (team === 'A') {
            if (user.room.teamA.includes(user)) return;

            user.room.teamB = wihtoutItem(user.room.teamB, user);
            user.room.teamA.push(user);
        } else {
            if (user.room.teamB.includes(user)) return;

            user.room.teamA = wihtoutItem(user.room.teamA, user);
            user.room.teamB.push(user);
        }
        this.onChange();
    };

    getRoom = (roomId: number | Room): Room | undefined => {
        return isRoom(roomId) ? roomId : this.roomList.find((r) => r.id === roomId);
    };
}

const isRoom = <T>(room: T | Room): room is Room => room instanceof Room;
