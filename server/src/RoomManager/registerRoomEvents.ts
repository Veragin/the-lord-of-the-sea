import { GameManager } from 'GameManager/GamerManager';
import { RoomManager } from './RoomManager';
import { User } from 'UserManager/User';
import { logger } from 'utils/logger';

export const registerRoomEvents = (user: User, roomManager: RoomManager, gameManager: GameManager) => {
    user.socket.on('roomAdd', (name) => {
        roomManager.addRoom(name ?? 'Noname room');
    });

    user.socket.on('roomRemove', (roomId: number) => {
        roomManager.removeRoom(roomId);
    });

    user.socket.on('roomEnter', (roomId: number) => {
        roomManager.enterRoom(roomId, user);
    });

    user.socket.on('roomLeave', () => {
        roomManager.leaveRoom(user);
    });

    user.socket.on('roomSwitch', (team: 'A' | 'B') => {
        roomManager.switchTeam(user, team);
    });

    user.socket.on('roomStart', () => {
        if (user.room === null) {
            logger.errorUser(user, `Started game, but is not in any room.`);
            return;
        }

        gameManager.addGame(user.room);
    });
};
