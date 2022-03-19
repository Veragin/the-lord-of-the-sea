import { RoomManager } from './tsx/RoomManager/RoomManager';
import { createUser } from './User/createUser';
import { useRef } from 'react';
import { userContext } from './tsx/Contexts/UserContext';

const App = () => {
    const user = useRef(createUser());

    return (
        <userContext.Provider value={user.current}>
            <RoomManager />
        </userContext.Provider>
    );
};

export default App;
