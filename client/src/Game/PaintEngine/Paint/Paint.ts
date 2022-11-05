import { GAME_VISIBLE_WIDTH, GAME_VISIBLE_PADDING, GAME_VISIBLE_HEIGHT } from '../../constants';
import { DataProvider } from '../../DataProvider/DataProvider';
import { TImageStore } from '../ImageStore';

const BORDER_W = GAME_VISIBLE_WIDTH / 2 + GAME_VISIBLE_PADDING;
const BORDER_H = GAME_VISIBLE_HEIGHT / 2 + GAME_VISIBLE_PADDING;

export class Paint {
    constructor(
        protected ctx: CanvasRenderingContext2D,
        protected imgStore: TImageStore,
        protected data: DataProvider
    ) {}

    protected checkRender = <T extends { x: number; y: number }>(o: T, render: () => void) => {
        const center = this.data.you.data;

        const x = o.x - center.x;
        const y = o.y - center.y;

        if (x < -BORDER_W || x > BORDER_W || y < -BORDER_H || y > BORDER_H) {
            return;
        }

        this.ctx.save();
        this.ctx.translate(o.x, o.y);
        render();
        this.ctx.restore();
    };
}
