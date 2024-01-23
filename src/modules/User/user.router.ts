import { Router } from 'express';
import { userContoller } from './controller/user.controller';

const router = Router();
const baseUrl = '/user';

router.get(`${baseUrl}/read`, userContoller.read);
router.post(`${baseUrl}/create`, userContoller.create);

export const userRouter = router;
