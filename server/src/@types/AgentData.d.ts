declare type TName = {
    id: number;
    name: string;
};

declare type TRoomData = {
    players: TName[];
    rooms: TName & {
        inGame: boolean;
        teamA: number[];
        teamB: number[];
    };
};
