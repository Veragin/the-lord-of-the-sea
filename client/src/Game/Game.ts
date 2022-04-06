import { DataProvider } from './DataProvider';
import { Paint } from './Paint/Paint';
import { RESOLUTION_FACTOR } from './constants';
import { User } from '../User/User';
import { registerKeyEvents } from './registerKeyEvents';

export class Game {
    private resizeObserver: ResizeObserver;
    public data: DataProvider = new DataProvider();
    private paint: Paint;

    constructor(public user: User, private canvas: HTMLCanvasElement) {
        this.paint = new Paint(this.canvas, this.data);

        user.eventRegister.registerGameEvents(this.data);

        this.resizeObserver = new ResizeObserver(() => this.onCanvasResize());
        this.resizeObserver.observe(this.canvas);
    }

    init = async (room: TRoom, gameLoadData: TGameLoad) => {
        this.data.init(room, gameLoadData, this.user.id());
        registerKeyEvents(this.user);
        await this.paint.init();
        this.paint.start();
    };

    onCanvasResize() {
        this.setCanvasSizes();
    }

    setCanvasSizes() {
        const width = RESOLUTION_FACTOR * this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;
        this.canvas.width = width;
        this.canvas.height = height;
        this.data.canvas.width = width;
        this.data.canvas.height = height;
    }

    destructor() {
        this.resizeObserver.unobserve(this.canvas);
    }
}
