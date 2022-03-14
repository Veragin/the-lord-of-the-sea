import { User } from "UserManager/User";
import { logger } from "utils/logger";

export const registerUserEvents = (user: User) => {
    user.socket.on("userChangeName", (name) => {
        if (typeof name === "string") {
            user.name = name;
        } else {
            logger.logUser(user, `Tried to change name with ${name}.`);
        }
    });
};
