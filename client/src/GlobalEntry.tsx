import App from './App';
import { createUser } from './User/createUser';
import { useState } from 'react';
import { userContext } from './tsx/Contexts/UserContext';

export const GlobalEntry = () => {
    const [user] = useState(createUser);

    return (
        <userContext.Provider value={user}>
            <App />
        </userContext.Provider>
    );
};
