import bcrypt from 'bcrypt';
import { prismaConnect } from '../../../prismaConn';
import { UtilsFileUser } from '../utils/utilsFileUser';

class UserService {
    public async create(name: string, email: string, password: string) {
        const findUser = await prismaConnect.user.findUnique({
            where: {
                email,
            },
        });

        if (findUser) {
            throw new Error(`Usuário já existente!`);
        }

        const create = await prismaConnect.user.create({
            data: {
                name,
                email,
                password: bcrypt.hashSync(password, 6),
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        UtilsFileUser.createFolderUser(create.id);

        return create;
    }

    public async read(paramsId: string) {
        const findUser = await prismaConnect.user.findUnique({
            where: {
                id: paramsId,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        if (!findUser) {
            throw new Error('Dados não encontrados.');
        }

        return findUser;
    }

    public async update(paramsId: string, name: string) {
        const findUser = await prismaConnect.user.findUnique({
            where: {
                id: paramsId,
            },
        });

        if (!findUser) {
            throw new Error('Dados não encontrados.');
        }

        const update = await prismaConnect.user.update({
            where: {
                id: paramsId,
            },
            data: {
                name,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return update;
    }

    public async delete(paramsId: string) {
        try {
            UtilsFileUser.deleteFolderUser(paramsId);

            return await prismaConnect.user.delete({
                where: {
                    id: paramsId,
                },
            });
        } catch (err) {
            throw new Error('Dados não encontrados.');
        }
    }
}

export const userService = new UserService();
