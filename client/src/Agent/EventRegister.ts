import { generateId, wihtoutId } from '../utils/utils';

import { SocketClient } from './SocketClient';

export class EventRegister {
    register: TEventRegister = {
        gameData: [],
        roomData: [],
        msg: [],
    };

    constructor(private socketClient: SocketClient) {
        this.registerEvents();
    }

    private registerEvents = () => {
        this.socketClient.socket.on('gameData', (gameData: TGameData) => {
            this.register.gameData.forEach((c) => c.do(gameData));
        });

        this.socketClient.socket.on('roomData', (roomData: TRoomData) => {
            this.register.roomData.forEach((c) => c.do(roomData));
        });

        this.socketClient.socket.on('msg', (msg: string) => {
            this.register.msg.forEach((c) => c.do(msg));
        });
    };

    subscribe = (eventSub: TEventRegisterSub) => {
        const id = generateId();
        switch (eventSub.type) {
            case 'gameData':
                this.register.gameData.push({ id, do: eventSub.do });
                break;
            case 'roomData':
                this.register.roomData.push({ id, do: eventSub.do });
                break;
            case 'msg':
                this.register.msg.push({ id, do: eventSub.do });
                break;
        }
        return id;
    };

    unsubscribe = (event: TSocketEvent, id: number) => {
        switch (event) {
            case 'gameData':
                this.register.gameData = wihtoutId(this.register.gameData, id);
                break;
            case 'roomData':
                this.register.roomData = wihtoutId(this.register.roomData, id);
                break;
            case 'msg':
                this.register.msg = wihtoutId(this.register.msg, id);
                break;
        }
    };
}

type TEventRegister = {
    gameData: {
        id: number;
        do: (data: TGameData) => void;
    }[];
    roomData: {
        id: number;
        do: (data: TRoomData) => void;
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
          type: 'msg';
          do: (data: string) => void;
      };

declare type TSocketEvent = keyof TEventRegister;
