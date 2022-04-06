import { generateId, wihtoutId } from '../utils/utils';

import { SocketClient } from './SocketClient';

export class EventRegister {
    register: TEventRegister = {
        gameData: [],
        roomData: [],
        gameInit: [],
        gameLoad: [],
        gameStart: [],
        gameEnd: [],
        msg: [],
    };

    constructor(private socketClient: SocketClient) {
        this.registerEvents();
    }

    private registerGameEvents = () => {
        this.socketClient.socket.on('gameData', (gameData: TGameData) => {
            this.register.gameData.forEach((c) => c.do(gameData));
        });

        this.socketClient.socket.on('gamePlayerData', (gamePlayerData: TGameData) => {
            this.register.gamePlayerData.forEach((c) => c.do(gamePlayerData));
        });
    };

    private registerEvents = () => {
        this.socketClient.socket.on('roomData', (roomData: TRoomData) => {
            this.register.roomData.forEach((c) => c.do(roomData));
        });

        this.socketClient.socket.on('gameInit', (room: TRoom) => {
            this.register.gameInit.forEach((c) => c.do(room));
        });

        this.socketClient.socket.on('gameLoad', (gameData: TGameLoad) => {
            this.register.gameLoad.forEach((c) => c.do(gameData));
        });

        this.socketClient.socket.on('gameStart', () => {
            this.register.gameStart.forEach((c) => c.do());
        });

        this.socketClient.socket.on('gameEnd', (roomId: number) => {
            this.register.gameEnd.forEach((c) => c.do(roomId));
        });

        this.socketClient.socket.on('msg', (msg: string) => {
            this.register.msg.forEach((c) => c.do(msg));
        });
    };

    subscribe = (eventSub: TEventRegisterSub) => {
        const id = generateId();
        this.register[eventSub.type].push({ id, do: eventSub.do as any });
        return id;
    };

    unsubscribe = (event: TSocketEvent, id: number) => {
        this.register[event] = wihtoutId<any>(this.register[event], id);
    };
}

type TEventRegister = {
    gameData: {
        id: number;
        do: (data: TGameData) => void;
    }[];
    gamePlayerData: {
        id: number;
        do: (data: TGameData) => void;
    }[];
    roomData: {
        id: number;
        do: (data: TRoomData) => void;
    }[];
    gameInit: {
        id: number;
        do: (data: TRoom) => void;
    }[];
    gameLoad: {
        id: number;
        do: (data: TGameLoad) => void;
    }[];
    gameStart: {
        id: number;
        do: () => void;
    }[];
    gameEnd: {
        id: number;
        do: (roomId: number) => void;
    }[];
    msg: { id: number; do: (data: string) => void }[];
};

type TEventRegisterSub =
    | {
          type: 'gameData';
          do: (data: TGameData) => void;
      }
    | {
          type: 'roomData';
          do: (data: TRoomData) => void;
      }
    | {
          type: 'gameInit';
          do: (data: TRoom) => void;
      }
    | {
          type: 'gameLoad';
          do: (data: TGameLoad) => void;
      }
    | {
          type: 'gameStart';
          do: () => void;
      }
    | {
          type: 'gameEnd';
          do: (roomId: number) => void;
      }
    | {
          type: 'msg';
          do: (data: string) => void;
      };

type TSocketEvent = keyof TEventRegister;
