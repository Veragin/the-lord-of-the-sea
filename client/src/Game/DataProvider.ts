export class DataProvider {
    public you: TPlayer = defaultPlayer;
    public players: TPlayer[] = [];
    public islands: TIsland[] = [];
    public canvas = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    init = (room: TRoom, data: TGameLoad, userId: number) => {
        this.players = data.users.map((u) => ({
            id: u.id,
            name: u.name,
            team: room.teamA.includes(u.id) ? 'A' : 'B',
            data: data.data.players.find((p) => p.id === u.id) ?? { ...defaultPlayerData },
            const: { ...defaultPlayer.const },
        }));

        this.you = this.players.find((p) => p.id === userId) ?? defaultPlayer;

        this.islands = data.islands;
    };

    update = (data: TGameData) => {
        data.players.forEach((p) => {
            const player = this.players.find((pp) => pp.id === p.id);
            if (player) {
                player.data = p;
            }
        });
    };
}

const defaultPlayerData = { x: 0, y: 0, front: 0 };
const defaultPlayer: TPlayer = {
    id: 0,
    name: '',
    team: 'A',
    data: { ...defaultPlayerData },
    const: { w: 40, h: 100 },
};
