import App from './App';
import { createUser } from './User/createUser';
import { useRef } from 'react';
import { userContext } from './tsx/Contexts/UserContext';

export const GlobalEntry = () => {
    const user = useRef(createUser());

    return (
        <userContext.Provider value={user.current}>
            <App />
        </userContext.Provider>
    );
};
