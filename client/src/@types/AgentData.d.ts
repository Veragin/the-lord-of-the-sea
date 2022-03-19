declare type TName = {
    id: number;
    name: string;
};

declare type TRoomData = {
    users: TName[];
    rooms: TRoom[];
};

declare type TRoom = {
    id: number;
    name: string;
    inGame: boolean;
    teamA: number[];
    teamB: number[];
};

declare type TGameData = {
    players: {
        id: number;
        name: string;
        x: number;
        y: number;
    }[];
};
