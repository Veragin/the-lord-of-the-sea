import { User } from '../UserManager/User';

export const registerUserEvents = (user: User, onChange: () => void) => {
    user.socket.on('userChangeName', (name?: string) => {
        console.log('username change', name, user.socket.id);
        if (typeof name === 'string') {
            user.name = name;
            onChange();
        } else {
            user.agent.sendMsg(`Tried to change name with ${name}.`);
        }
    });
};
