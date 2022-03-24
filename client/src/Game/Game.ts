import { DataProvider } from './DataProvider';
import { Paint } from './Paint';
import { RESOLUTION_FACTOR } from './constants';
import { User } from '../User/User';
import { registerKeyEvents } from './registerKeyEvents';

export class Game {
    private resizeObserver: ResizeObserver;
    private data: DataProvider = new DataProvider();
    private paint: Paint;

    private subGameId: number;

    constructor(public user: User, private canvas: HTMLCanvasElement) {
        this.paint = new Paint(this.canvas, this.data);

        this.subGameId = user.eventRegister.subscribe({ type: 'gameData', do: (d) => this.onGameData(d) });

        this.resizeObserver = new ResizeObserver(() => this.onCanvasResize());
        this.resizeObserver.observe(this.canvas);
    }

    init = async (room: TRoom, gameLoadData: TGameLoad) => {
        this.data.init(room, gameLoadData, this.user.id());
        registerKeyEvents(this.user);
        this.paint.render();
    };

    onGameData = (data: TGameData) => {
        this.data.update(data);
        this.paint.render();
    };

    onCanvasResize() {
        this.setCanvasSizes();
        this.paint.render();
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
        this.user.eventRegister.unsubscribe('gameData', this.subGameId);
    }
}
