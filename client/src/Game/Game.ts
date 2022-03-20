import { DataProvider } from './DataProvider';
import { Paint } from './Paint';
import { RESOLUTION_FACTOR } from './constants';
import { User } from '../User/User';

export class Game {
    private resizeObserver: ResizeObserver;
    private data: DataProvider;
    private paint: Paint;

    constructor(public user: User, private canvas: HTMLCanvasElement, private roomData: TRoom) {
        this.data = new DataProvider(user.eventRegister, roomData);
        this.paint = new Paint(this.canvas, this.data);

        this.resizeObserver = new ResizeObserver(() => this.onCanvasResize());
        this.resizeObserver.observe(this.canvas);
    }

    onCanvasResize() {
        this.setCanvasSizes();
        this.render();
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
        this.paint.destructor();
    }
}
