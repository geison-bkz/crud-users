import { Router } from 'express';
import { authController } from './controller/authController';

const router = Router();
const baseUrl = '/auth';

router.post(`${baseUrl}/login`, authController.login);
router.post(`${baseUrl}/token`, authController.token);

export const authRouter = router;
