import { User } from "../UserManager/User";

class Logger {
    logUser = (user: User, msg: string) => {
        console.log(`USER [${user.id}] ${user.name}: `, msg);
    };

    errorUser = (user: User, msg: string) => {
        console.error(`USER [${user.id}] ${user.name}: `, msg);
    };
}

const logger = new Logger();

export { logger };
