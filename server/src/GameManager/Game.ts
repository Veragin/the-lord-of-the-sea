import { Room } from "RoomManager/Room";
import { generateId } from "../utils/utils";

export class Game {
    id = generateId();

    constructor(public room: Room) {}
}
