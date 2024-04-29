import { Request, Response } from 'express';
import { z } from 'zod';

class AuthController {
    public async login(req: Request, res: Response) {}
    public async token(req: Request, res: Response) {}
}

export const authController = new AuthController();
