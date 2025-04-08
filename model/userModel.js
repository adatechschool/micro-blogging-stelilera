import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class User {
    static async findAll() {
        return await prisma.users.findMany()
    }

    static async create(data) {
        console.log(data);
        
        const user = await prisma.users.create({
            data: {
              name: data.name,
              lastname: data.lastname,
              mail: data.mail,
              password: data.password
            }
          })
        return user;
      }
};

export default User;