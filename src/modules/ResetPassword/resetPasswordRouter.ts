import { Router } from 'express';
import { resetPasswordController } from './controller/resetPasswordController';

const router = Router();
const baseUrl = '/reset-password';

router.patch(`${baseUrl}`, resetPasswordController.resetPassword);
router.post(`${baseUrl}`, resetPasswordController.validateUser);
router.post(`${baseUrl}/validate`, resetPasswordController.validateSecurityCode);

export const resetPasswordRouter = router;
