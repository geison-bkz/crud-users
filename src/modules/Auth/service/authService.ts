import bcrypt from 'bcrypt';
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
    public async token() {}
}

export const authService = new AuthService();
