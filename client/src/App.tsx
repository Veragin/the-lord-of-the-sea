import { useEffect, useRef, useState } from 'react';

import { GameComponent } from './tsx/GameComponent/GameComponent';
import { RoomManager } from './tsx/RoomManager/RoomManager';
import { createUser } from './User/createUser';
import { userContext } from './tsx/Contexts/UserContext';

const App = () => {
    const user = useRef(createUser());
    const [gameRoom, setGameRoom] = useState<TRoom | null>(null);

    useEffect(() => {
        let room: TRoom | null = null;

        const initId = user.current.eventRegister.subscribe({
            type: 'gameInit',
            do: (r) => {
                room = r;
                setGameRoom(r);
            },
        });
        const endId = user.current.eventRegister.subscribe({
            type: 'gameEnd',
            do: (roomId) => {
                if (roomId === room?.id) {
                    room = null;
                    setGameRoom(null);
                }
            },
        });

        return () => {
            user.current.eventRegister.unsubscribe('gameInit', initId);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            user.current.eventRegister.unsubscribe('gameEnd', endId);
        };
    }, []);

    return (
        <userContext.Provider value={user.current}>
            {gameRoom ? <GameComponent room={gameRoom} /> : <RoomManager />}
        </userContext.Provider>
    );
};

export default App;
