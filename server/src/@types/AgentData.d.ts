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
        x: number;
        y: number;
        angle: TAngle;
        sail: boolean;
    }[];
    wind: {
        angle: number;
        strength: number;
    };
};

declare type TGamePlayerData = {
    gold: number;
    inventory: import('../Const/Items').TItemName[];
    maxInventory: number;
};

declare type TGameLoad = {
    data: TGameData;
    users: TName[];
    map: {
        islands: TIsland[];
        width: number;
        height: number;
    };
    wind: {
        angle: number;
        strength: number;
    };
};
