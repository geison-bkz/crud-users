import { authRouter } from './modules/Auth/authRouter';
import { userRouter } from './modules/User/userRouter';

export const router = [userRouter, authRouter];
