import { Router } from 'express';
import { userContoller } from './controller/userController';

const router = Router();
const baseUrl = '/user';

router.post(`${baseUrl}`, userContoller.create);

export const userRouter = router;
