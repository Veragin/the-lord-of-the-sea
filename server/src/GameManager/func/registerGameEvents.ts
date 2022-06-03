import { Player } from '../Player/Player';

export const registerGameEvents = (players: Player[]) => {
    players.forEach((p) => registerGameEventsForPlayer(p));
};

export const registerGameEventsForPlayer = (player: Player) => {
    const user = player.user;

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

    user.socket.on('gameMine', (on: boolean) => {
        player.control.mine = on;
        if (!on) {
            player.ship.mineCooldown = 0;
        }
    });
};
