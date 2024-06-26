import { Request, Response } from 'express';
import { z } from 'zod';

import { userService } from '../service/userService';
import { EZod } from '../../../enum/zodEnum';
import { ECrud } from '../../../enum/crudEnum';
import { EStatusErrors } from 'enum/statusErrorsEnum';

class UserController {
    public async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        try {
            const zUserSchema = z.object({
                name: z.string().optional(),
                email: z.string().email({ message: `E-mail ${EZod.REQUIRED}` }),
                password: z.string().min(8, { message: `Senha ${EZod.REQUIRED}` }),
            });
            zUserSchema.parse({ name, email, password });
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors,
            });
        }

        try {
            return res.json({
                message: ECrud.CREATE,
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
            const zUserSchema = z.string().min(30, { message: `ID ${EZod.REQUIRED}` });
            zUserSchema.parse(paramsId);
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors,
            });
        }

        try {
            return res.json({
                message: ECrud.READ,
                data: await userService.read(paramsId),
            });
        } catch (err: any) {
            return res.status(404).json({
                error: err.message,
            });
        }
    }

    public async update(req: Request, res: Response) {
        const paramsId = req.params.id;
        const { name } = req.body;

        try {
            const zUserSchema = z.object({
                paramsId: z.string().min(30, { message: `Id ${EZod.REQUIRED}` }),
                name: z.string().min(1, { message: `Nome ${EZod.REQUIRED}` }),
            });
            zUserSchema.parse({ paramsId, name });
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors,
            });
        }

        try {
            return res.json({
                message: ECrud.UPDATE,
                data: await userService.update(paramsId, name),
            });
        } catch (err: any) {
            return res.status(404).json({
                error: err.message,
            });
        }
    }

    public async delete(req: Request, res: Response) {
        const paramsId = req.params.id;

        try {
            const zUserSchema = z.string().min(30, { message: `Id ${EZod.REQUIRED}` });
            zUserSchema.parse(paramsId);
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors,
            });
        }

        try {
            await userService.delete(paramsId);
            return res.json({
                message: ECrud.DELETE,
            });
        } catch (err: any) {
            return res.status(404).json({
                error: err.message,
            });
        }
    }
}

export const userContoller = new UserController();
