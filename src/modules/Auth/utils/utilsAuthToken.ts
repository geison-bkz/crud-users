import jwt from 'jsonwebtoken';

export class UtilsAuthToken {
    public static async jwtGenerate(userPayLoad: {
        id: string;
        name: string | null;
        email: string;
        password?: string;
    }) {
        const payload = userPayLoad;
        delete payload.password;

        const acessToken = jwt.sign({ payload }, '70d2eb05509e80616008c2b09e7b444c', {
            expiresIn: '15m',
        });

        const refreshToken = jwt.sign(
            { payload: { id: payload.id } },
            '98b8e0906f31644a72cbbaf4fa343f0b',
        );

        return { acessToken, refreshToken };
    }
}
