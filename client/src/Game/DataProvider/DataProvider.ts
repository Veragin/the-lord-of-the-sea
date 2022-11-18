import { action, makeObservable, observable } from 'mobx';
import { Map } from './Map';

export class DataProvider {
    public you: TPlayer = defaultPlayer;
    public playerData: TGamePlayerData = {
        gold: 0,
        inventory: [],
        maxInventory: 2,
    };

    public players: TPlayer[] = [];
    public bullets: TPoint[] = [];
    public map = new Map();
    public wind = {
        angle: 0,
        strength: 0,
    };
    public canvas = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    constructor() {
        makeObservable(this, {
            playerData: observable,
            updatePlayerData: action,
        });
    }

    init = (room: TRoom, data: TGameLoad, userId: number) => {
        this.players = data.users.map((u) => ({
            id: u.id,
            name: u.name,
            team: room.teamA.includes(u.id) ? 'A' : 'B',
            data: data.data.players.find((p) => p.id === u.id) ?? { ...defaultPlayerData },
            const: { ...defaultPlayer.const },
        }));

        this.you = this.players.find((p) => p.id === userId) ?? defaultPlayer;

        this.map.init(data.map);
        this.wind = data.wind;
    };

    update = (data: TGameData) => {
        data.players.forEach((p) => {
            const player = this.players.find((pp) => pp.id === p.id);
            if (player) {
                player.data = p;
            }
        });

        this.wind = data.wind;
        this.bullets = data.bullets;
    };

    updatePlayerData = (data: TGamePlayerData) => {
        this.playerData = data;
    };
}

const defaultPlayerData = {
    x: 0,
    y: 0,
    angle: 0,
    sail: false,
    health: 10,
    maxHealth: 10,
};
const defaultPlayer: TPlayer = {
    id: 0,
    name: '',
    team: 'A',
    data: { ...defaultPlayerData },
    const: { w: 40, h: 100 },
};
