declare type TName = {
    id: number;
    name: string;
};

declare type TRoomData = {
    players: TName[];
    rooms: {
        id: number;
        name: string;
        inGame: boolean;
        teamA: number[];
        teamB: number[];
    }[];
};

declare type TGameData = {
    players: {
        id: number;
        name: string;
        x: number;
        y: number;
    }[];
};
