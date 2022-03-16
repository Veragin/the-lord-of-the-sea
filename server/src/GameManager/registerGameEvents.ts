import { User } from '../UserManager/User';
import { logger } from 'utils/logger';

export const registerGameEvents = (user: User) => {
    const player = user.player;
    if (player === null) {
        logger.errorUser(user, 'Tried to registerGameEvents without player.');
        return;
    }

    user.socket.on('gameLeft', (on: boolean) => {
        player.control.left = on;
    });

    user.socket.on('gameRight', (on: boolean) => {
        player.control.right = on;
    });

    user.socket.on('gameForward', (on: boolean) => {
        player.control.forward = on;
    });

    user.socket.on('gameBack', (on: boolean) => {
        player.control.back = on;
    });

    user.socket.on('gameSail', (on: boolean) => {
        player.control.sail = on;
    });

    user.socket.on('gameFire', () => {
        player.control.fire = true;
    });
};
