import { authRouter } from './modules/Auth/auth.router';
import { userRouter } from './modules/User/user.router';

export const router = [userRouter, authRouter];
