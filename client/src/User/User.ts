import { EventRegister } from '../Agent/EventRegister';
import { GameAgent } from '../Agent/GameAgent';
import { RoomAgent } from '../Agent/RoomAgent';
import { SocketClient } from '../Agent/SocketClient';
import { UserAgent } from '../Agent/UserAgent';

export class User {
    name = '';
    room: TRoom | null = null;

    constructor(
        public socketClient: SocketClient,
        public gameAgent: GameAgent,
        public userAgent: UserAgent,
        public roomAgent: RoomAgent,
        public eventRegister: EventRegister
    ) {}

    id = () => this.socketClient.userId;
}
