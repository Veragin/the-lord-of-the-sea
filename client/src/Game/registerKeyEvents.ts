import { User } from '../User/User';
import { throttle } from '../utils/throttle';

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
        }
    });

    let isMouseDown = false;
    document.addEventListener('mousedown', (e) => {
        console.log(e.button);
        if (e.button === 0) {
            isMouseDown = true;
            user.gameAgent.doFire({
                x: e.clientX,
                y: e.clientY,
            });
        }
    });

    document.addEventListener(
        'mousemove',
        throttle((e) => {
            if (isMouseDown) {
                user.gameAgent.doFire({
                    x: e.clientX,
                    y: e.clientY,
                });
            }
        })
    );

    document.addEventListener('mouseup', (e) => {
        console.log(e.button);
        if (e.button === 0) {
            isMouseDown = false;
            user.gameAgent.doFire(null);
        }
    });
};
