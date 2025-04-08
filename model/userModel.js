import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class User {
    static async findAll() {
        return await prisma.user.findMany()
    }

    static async update (id,data){
        return await prisma.user.update({
        where: { id: Number(id) },
        data,
        });
    }

    static async delete(id){
        return await prisma.user.delete({
        where: { id: Number(id) },
    });
    }
    
};

export default User;