import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

class User {
    static async findAll() {
        return await prisma.users.findMany()
    }

    static async update (id,data){ //update (fonctionnelle)
       try{

    console.log("ID reçu:", id, "Type:", typeof id);
    console.log("Données reçues:", data);
    

            let hashedPassword
            if(data.password){
              hashedPassword = await bcrypt.hash(data.password, 10); // hashé le mot de passe de l'utilisateur

            }
        
             const updateData = {
               name: data.name,
              lastname: data.lastname,
              mail: data.mail,
              password: data.password
            }

            if (hashedPassword) {
              updateData.password = hashedPassword; // Ici on utilise le mot de passe hashé, pas data.password
            }

             console.log("Données à mettre à jour:", updateData)
              const user = await prisma.users.update({
              where: {id:id },
              data: updateData
    });
 console.log("Résultat de la mise à jour:", user);
    return user;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    throw new Error("Échec de la mise à jour de l'utilisateur.");
  }
}
      
    static async delete (id){ //delete
        return await prisma.users.delete({
          where: { id:id },
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
      });
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