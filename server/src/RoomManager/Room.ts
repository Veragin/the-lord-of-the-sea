import { Player } from "PlayerManager/Player";
import { generateId } from "../utils";

export class Room {
    id: number = generateId();
    players: Player[] = [];
    teamA: Player[] = [];
    teamB: Player[] = [];

    constructor(public name: string) {}
}
