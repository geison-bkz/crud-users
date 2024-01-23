import { Request, Response } from 'express';

class AuthController {
    public read(req: Request, res: Response) {
        return res.json({
            data: 'Auth route',
        });
    }
}

export const authController = new AuthController();
