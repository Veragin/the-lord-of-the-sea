import { useEffect, useState } from 'react';

import { GameComponent } from './tsx/GameComponent/GameComponent';
import { RoomManager } from './tsx/RoomManager/RoomManager';
import { useUser } from './tsx/Contexts/UserContext';

const App = () => {
    const user = useUser();
    const [gameRoom, setGameRoom] = useState<TRoom | null>(null);

    useEffect(() => {
        let room: TRoom | null = null;

        console.log('game init in useEffect');

        const initId = user.eventRegister.subscribe({
            type: 'gameInit',
            do: (r) => {
                room = r;
                setGameRoom(r);
            },
        });
        const endId = user.eventRegister.subscribe({
            type: 'gameEnd',
            do: (roomId) => {
                if (roomId === room?.id) {
                    room = null;
                    setGameRoom(null);
                }
            },
        });

        return () => {
            user.eventRegister.unsubscribe('gameInit', initId);
            user.eventRegister.unsubscribe('gameEnd', endId);
        };
    }, [user]);

    return gameRoom ? <GameComponent room={gameRoom} /> : <RoomManager />;
};

export default App;
