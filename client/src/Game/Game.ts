import { DataProvider } from './DataProvider/DataProvider';
import { PaintEngine } from './PaintEngine/PaintEngine';
import { RESOLUTION_FACTOR } from './constants';
import { User } from '../User/User';
import { ControllRegister } from './ControllRegister';

export class Game {
    public data: DataProvider = new DataProvider();
    private paintEngine: PaintEngine;
    private controllRegister: ControllRegister;

    constructor(public user: User, private canvas: HTMLCanvasElement) {
        this.paintEngine = new PaintEngine(this.canvas, this.data);
        this.controllRegister = new ControllRegister(this.user, this.canvas);

        user.eventRegister.registerGameEvents(this.data);

        document.addEventListener('resize', this.onCanvasResize);
        this.onCanvasResize();
    }

    init = async (room: TRoom, gameLoadData: TGameLoad) => {
        this.data.init(room, gameLoadData, this.user.id());
        this.controllRegister.registerEvents();
        await this.paintEngine.init();
        this.paintEngine.start();
    };

    onCanvasResize() {
        this.setCanvasSizes();
    }

    setCanvasSizes() {
        const width = RESOLUTION_FACTOR * this.canvas.offsetWidth;
        const height = RESOLUTION_FACTOR * this.canvas.offsetHeight;
        this.canvas.width = width;
        this.canvas.height = height;
        this.data.canvas.width = width;
        this.data.canvas.height = height;
    }

    destructor() {
        document.removeEventListener('resize', this.onCanvasResize);
        this.paintEngine.destructor();
    }
}
