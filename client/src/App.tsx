import { RoomManager } from './tsx/RoomManager/RoomManager';
import { createUser } from './User/createUser';
import { useRef } from 'react';

const App = () => {
    const user = useRef(createUser());

    return <RoomManager user={user.current} />;
};

export default App;
