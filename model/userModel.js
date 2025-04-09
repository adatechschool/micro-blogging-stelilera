import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient();

class User {
    static async findAll() {
        return await prisma.users.findMany()
    }

    static async update (id,data){
        return await prisma.users.update({
        where: { id: Number(id) },
        data,
        });
    }

    static async delete(id){
        return await prisma.users.delete({
        where: { id: Number(id) },
    });
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