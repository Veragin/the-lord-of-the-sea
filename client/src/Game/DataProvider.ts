import { EventRegister } from '../Agent/EventRegister';

export class DataProvider {
    private gameId: number;
    public game: TGameData = { players: [] };
    public canvas = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    constructor(private eventRegister: EventRegister, public room: TRoom) {
        this.gameId = eventRegister.subscribe({ type: 'gameData', do: (d) => (this.game = d) });
    }

    destructor = () => {
        this.eventRegister.unsubscribe('gameData', this.gameId);
    };
}
