import { Router } from 'express';
import { authController } from './controller/auth.controller';

const router = Router();
const baseUrl = '/auth';

router.get(`${baseUrl}/read`, authController.read);

export const authRouter = router;
