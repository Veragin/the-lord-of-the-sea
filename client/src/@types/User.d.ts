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
    };
    const: {
        w: number;
        h: number;
    };
};
