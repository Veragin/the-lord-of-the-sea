declare type TUserTeam = 'A' | 'B';

declare type TPlayer = {
    id: number;
    name: string;
    team: TUserTeam;
    data: {
        x: number;
        y: number;
        front: number;
    };
    const: {
        w: number;
        h: number;
    };
};
