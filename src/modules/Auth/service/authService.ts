import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UtilsAuthToken } from '../utils/utilsAuthToken';
import { EStatusErrors } from 'enum/statusErrorsEnum';
import { prismaConnect } from 'prismaConn';

class AuthService {
    public async login(email: string, password: string) {
        const findUser = await prismaConnect.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });

        if (!findUser) {
            throw new Error(EStatusErrors.E404);
        }

        if (!bcrypt.compareSync(password, findUser.password)) {
            throw new Error(EStatusErrors.E401);
        }

        return UtilsAuthToken.jwtGenerate(findUser);
    }

    public async token(refresherToken: string) {
        try {
            await jwt.verify(refresherToken, `${process.env.JWT_REFRESH_TOKEN_SECRET}`);
        } catch (error) {
            throw new Error(EStatusErrors.E401);
        }

        const decode = ((await jwt.decode(refresherToken)) as { payload: { id: string } }).payload;

        const findUser = await prismaConnect.user.findUnique({
            where: {
                id: decode.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });

        if (!findUser) {
            throw new Error(EStatusErrors.E404);
        }

        return UtilsAuthToken.jwtGenerate(findUser);
    }
}

export const authService = new AuthService();
