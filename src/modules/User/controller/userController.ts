import { Request, Response } from 'express';
import { z } from 'zod';

import { userService } from '../service/userService';

class UserController {
    public async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        try {
            const zUserSchema = z.object({
                name: z.string().optional(),
                email: z.string().email({ message: 'E-mail é obrigatório.' }),
                password: z.string().min(8, { message: 'Senha é obrigatório.' }),
            });
            zUserSchema.parse({ name, email, password });
        } catch (err) {
            return res.status(400).json({
                message: 'Dados inválido',
                error: err,
            });
        }

        try {
            return res.json({
                message: `Usuário criado com sucesso`,
                data: await userService.create(name, email, password),
            });
        } catch (err: any) {
            return res.status(409).json({
                message: err.message,
            });
        }
    }
}

export const userContoller = new UserController();
