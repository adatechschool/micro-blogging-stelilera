import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
console.log(prisma);

class User {
    static async findAll() {
        return await prisma.user.findMany()
    }
};

export default User;