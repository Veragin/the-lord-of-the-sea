import { User } from '../User/User';
import { throttle } from '../utils/throttle';

export class ControllRegister {
    isMouseDown = false;

    constructor(private user: User, private canvas: HTMLCanvasElement) {}

    registerEvents = () => {
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
        document.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    };

    private onKeyDown = (e: KeyboardEvent) => {
        if (e.repeat) return;

        switch (e.key) {
            case 'w':
                this.user.gameAgent.moveForward(true);
                break;
            case 's':
                this.user.gameAgent.moveBack(true);
                break;
            case 'a':
                this.user.gameAgent.turnLeft(true);
                break;
            case 'd':
                this.user.gameAgent.turnRight(true);
                break;
            case ' ':
                this.user.gameAgent.doSail(true);
                break;
        }
    };

    private onKeyUp = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'w':
                this.user.gameAgent.moveForward(false);
                break;
            case 's':
                this.user.gameAgent.moveBack(false);
                break;
            case 'a':
                this.user.gameAgent.turnLeft(false);
                break;
            case 'd':
                this.user.gameAgent.turnRight(false);
                break;
            case ' ':
                this.user.gameAgent.doSail(false);
                break;
        }
    };

    private onMouseDown = (e: MouseEvent) => {
        if (e.button === 0) {
            this.isMouseDown = true;
            this.user.gameAgent.doFire({
                x: e.clientX - this.canvas.offsetWidth / 2,
                y: e.clientY - this.canvas.offsetHeight / 2,
            });
        }
    };

    private onMouseMove = throttle((e: MouseEvent) => {
        if (this.isMouseDown) {
            this.user.gameAgent.doFire({
                x: e.clientX - this.canvas.offsetWidth / 2,
                y: e.clientY - this.canvas.offsetHeight / 2,
            });
        }
    });

    private onMouseUp = (e: MouseEvent) => {
        if (e.button === 0) {
            this.isMouseDown = false;
            this.user.gameAgent.doFire(null);
        }
    };

    destructor() {
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keyup', this.onKeyUp);
        document.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }
}
