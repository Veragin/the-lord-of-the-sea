import { User } from '../../User/User';
import { createSafeContext } from './context';

export const [userContext, useUser] = createSafeContext<User>('user');
