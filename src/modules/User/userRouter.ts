import { Router } from 'express';
import { userContoller } from './controller/userController';

const router = Router();
const baseUrl = '/user';

router.post(`${baseUrl}`, userContoller.create);
router.get(`${baseUrl}/:id`, userContoller.read);

export const userRouter = router;
