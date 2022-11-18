declare type TUserState = 'inRoom' | 'gameInitDone' | 'gameLoadDone' | 'inGame';

declare type TUserTeam = 'A' | 'B';

declare type TPlayer = {
    id: number;
    name: string;
    team: TUserTeam;
    data: {
        x: number;
        y: number;
        angle: number;
        sail: boolean;
        health: p.ship.health;
        maxHealth: p.ship.maxHealth;
    };
    const: {
        w: number;
        h: number;
    };
};
