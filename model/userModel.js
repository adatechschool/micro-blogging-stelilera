import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class User {
    static async findAll() {
        return await prisma.user.findMany()
    }
};

export default User;