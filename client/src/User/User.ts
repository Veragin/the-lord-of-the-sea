import { GameAgent } from "../Agent/GameAgent";
import { RoomAgent } from "../Agent/RoomAgent";
import { UserAgent } from "../Agent/UserAgent";

export class User {
    name = "";

    constructor(public gameAgent: GameAgent, public userAgent: UserAgent, public roomAgent: RoomAgent) {}
}
