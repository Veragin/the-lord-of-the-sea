import { User } from '../UserManager/User';

export const registerUserEvents = (user: User) => {
    user.socket.on('userChangeName', (name?: string) => {
        if (typeof name === 'string') {
            user.name = name;
        } else {
            user.agent.sendMsg(`Tried to change name with ${name}.`);
        }
    });
};
