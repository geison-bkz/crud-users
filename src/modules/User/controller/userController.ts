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
        } catch (err: any) {
            return res.status(400).json({
                message: 'Dados inválido',
                error: err.errors,
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

    public async read(req: Request, res: Response) {
        const paramsId = req.params.id;

        try {
            const zUserSchema = z.string().min(30, { message: 'ID é obrigatório.' });
            zUserSchema.parse(paramsId);
        } catch (err: any) {
            return res.status(400).json({
                message: 'Dados invalidos',
                error: err.errors,
            });
        }

        try {
            return res.json({
                message: 'Encontrado com sucesso.',
                data: await userService.read(paramsId),
            });
        } catch (err: any) {
            return res.status(404).json({
                error: err.message,
            });
        }
    }
}

export const userContoller = new UserController();
