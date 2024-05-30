import jwt from 'jsonwebtoken';

export class UtilsAuthToken {
    public static jwtGenerate(userPayLoad: {
        id: string;
        name: string | null;
        email: string;
        password?: string;
    }) {
        const payload = userPayLoad;
        delete payload.password;

        const acessToken = jwt.sign({ payload }, `${process.env.JWT_SECRET}`, {
            expiresIn: `${process.env.JWT_EXPIRES_IN}`,
        });

        const refreshToken = jwt.sign(
            { payload: { id: payload.id } },
            `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
        );

        return { acessToken, refreshToken };
    }
}
