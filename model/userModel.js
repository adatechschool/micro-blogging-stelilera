import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

  static async login(data){
    try {
      const { mail, password } = data;
      const user = await prisma.users.findFirst({ where: { mail } });

      if(!user){
        return res.status(401).json({ message: 'Email incorrect ou utilisateur inexistant.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password); // comparer les mdp
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Mot de passe incorrect.' });
      }

      const token = jwt.sign({ id: user.id, mail: user.mail }, 'your-secret-token', { expiresIn: '1h' }); // créer un token au user

      //req.session.user = { id: user.id, mail: user.mail, token }; // créer une session au user 
      return {id: user.id, mail: user.mail, token}
    } catch(e){
      console.error('Erreur de connexion :', e.message);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  }
}
export default User;