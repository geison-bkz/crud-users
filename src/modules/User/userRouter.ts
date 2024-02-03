import { Router } from 'express';
import { userContoller } from './controller/userController';

const router = Router();
const baseUrl = '/user';

router.post(`${baseUrl}`, userContoller.create);
router.get(`${baseUrl}/:id`, userContoller.read);
router.patch(`${baseUrl}/:id`, userContoller.update);
router.delete(`${baseUrl}/:id`, userContoller.delete);

export const userRouter = router;
