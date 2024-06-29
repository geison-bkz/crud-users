import { authRouter } from './modules/Auth/authRouter';
import { userRouter } from './modules/User/userRouter';
import { resetPasswordRouter } from 'modules/ResetPassword/resetPasswordRouter';

export const router = [authRouter, userRouter, resetPasswordRouter];
