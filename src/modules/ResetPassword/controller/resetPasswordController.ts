import e, { Request, Response } from 'express';
import { z } from 'zod';
import { resetPasswordService } from '../service/resetPasswordService';
import { EStatusErrors } from 'enum/statusErrorsEnum';
import { EZod } from 'enum/zodEnum';

class ResetPasswordController {
    public async validateUser(req: Request, res: Response) {
        const email = req.body.email;

        try {
            const ZUserSchema = z.string().email({
                message: `Email ${EZod.REQUIRED}`,
            });
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors,
            });
        }

        try {
            return res.json({
                message: 'Código enviado para o email',
                data: await resetPasswordService.validateUser(email),
            });
        } catch (err: any) {
            return res.status(404).json({
                message: err.message,
            });
        }
    }
    public async validateSecurityCode(req: Request, res: Response) {
        const { email, secret } = req.body;

        try {
            const ZUserSchema = z.object({
                email: z.string().email({ message: `Email ${EZod.REQUIRED}` }),
                secret: z.string().min(6, { message: `Segredo ${EZod.REQUIRED}` }),
            });

            ZUserSchema.parse({ email, secret });
        } catch (error) {
            console.log('Ajustar aqui depois');
        }
    }
    public async resetPassword(req: Request, res: Response) {}
}

export const resetPasswordController = new ResetPasswordController();
