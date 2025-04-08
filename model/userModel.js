import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

class User {
    static async findAll() {
        return await prisma.users.findMany()
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
    
    static async register(data) {
      try {
        const hashedPassword = await bcrypt.hash(data.password, 10); // hashé le mot de passe de l'utilisateur

        const user = await prisma.users.create({
          data: {
            name: data.name,
            lastname: data.lastname,
            mail: data.mail,
            password: hashedPassword
        }
      })
        // Génération du token JWT après inscription
        const token = jwt.sign(
          { id: user.id, mail: data.mail },
          'your-secret-key',
          { expiresIn: '1h' }
      );
      return { user, token };

    } catch (e){
      console.error('Erreur lors de l\'inscription :', e.message);
      throw new Error('Échec de l\'inscription.');
    }
  };
}
export default User;