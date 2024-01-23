import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

class UserController {
    public async create(req: Request, res: Response) {
        const prisma = new PrismaClient();

        await prisma.user.create({
            data: {
                email: 'geison.teste@teste.com',
                name: 'Geison dos Santos',
            },
        });

        return res.json({
            data: 'Criado com sucessso!',
        });
    }

    public read(req: Request, res: Response) {
        return res.json({
            data: 'Hello World!',
        });
    }
}

export const userContoller = new UserController();
