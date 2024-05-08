import { Request, Response } from 'express';
import { z } from 'zod';
import { authService } from '../service/authService';
import { EStatusErrors } from 'enum/statusErrorsEnum';
import { EZod } from 'enum/zodEnum';

class AuthController {
    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const ZUserSchema = z.object({
                email: z.string().email({ message: `Email ${EZod.REQUIRED}` }),
                password: z.string().min(1, { message: `Senha ${EZod.REQUIRED}` }),
            });

            ZUserSchema.parse({ email, password });
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors,
            });
        }

        try {
            return res.json({
                data: await authService.login(email, password),
            });
        } catch (err: any) {
            switch (err.message) {
                case EStatusErrors.E401:
                    return res.status(401).json({
                        message: err.message,
                    });
                    break;

                case EStatusErrors.E404:
                    return res.status(404).json({
                        message: err.message,
                    });
                    break;
            }
        }
    }
    public async token(req: Request, res: Response) {}
}

export const authController = new AuthController();
