import { Game } from "GameManager/Game";
import { User } from "../UserManager/User";
import { generateId } from "../utils/utils";

export class Room {
    id: number = generateId();
    users: User[] = [];
    teamA: User[] = [];
    teamB: User[] = [];
    game: Game | null = null;

    constructor(public name: string) {}
}
