import { User } from '../User/User';

export const registerKeyEvents = (user: User) => {
    document.addEventListener('keydown', (e) => {
        if (e.repeat) return;

        switch (e.key) {
            case 'w':
                user.gameAgent.moveForward(true);
                break;
            case 's':
                user.gameAgent.moveBack(true);
                break;
            case 'a':
                user.gameAgent.turnLeft(true);
                break;
            case 'd':
                user.gameAgent.turnRight(true);
                break;
            case ' ':
                user.gameAgent.doSail(true);
                break;
            case 'r':
                user.gameAgent.doFire(true);
                break;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'w':
                user.gameAgent.moveForward(false);
                break;
            case 's':
                user.gameAgent.moveBack(false);
                break;
            case 'a':
                user.gameAgent.turnLeft(false);
                break;
            case 'd':
                user.gameAgent.turnRight(false);
                break;
            case ' ':
                user.gameAgent.doSail(false);
                break;
            case 'r':
                user.gameAgent.doFire(false);
                break;
        }
    });
};
