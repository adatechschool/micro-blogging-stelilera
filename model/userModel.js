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
    

            let hashedPassword;
            if(data.password){
              hashedPassword = await bcrypt.hash(data.password, 10); // hashé le mot de passe de l'utilisateur

            }
        
             const updateData = {
              name: data.name,
              lastname: data.lastname,
              mail: data.mail,
              password: hashedPassword
            }

            // if (hashedPassword) {
            //   updateData.password = hashedPassword; // Ici on utilise le mot de passe hashé, pas data.password
            // }

             console.log("Données à mettre à jour:", updateData)
              const user = await prisma.users.update({
              where: { id: id },
              data: updateData
    });
 console.log("Résultat de la mise à jour:", user);
    return user;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error.message);
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
        
        const existingUser = await prisma.users.findFirst({
          where: { mail: data.mail }
        });
    
        if (existingUser) {
          throw new Error('Cet email est déjà utilisé. Veuillez choisir un autre.');
        }
    
        const hashedPassword = await bcrypt.hash(data.password, 10); // hashé le mot de passe de l'utilisateur

        const user = await prisma.users.create({
          data: {
            name: data.name,
            lastname: data.lastname,
            mail: data.mail,
            password: hashedPassword
        }
      });
      return { user };

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
        return undefined
      }

      const isPasswordValid = await bcrypt.compare(password, user.password); // comparer les mdp
      if (!isPasswordValid) {
        return undefined
      }

      //req.session.user = { id: user.id, mail: user.mail, token }; // créer une session au user 
      return {id: user.id, mail: user.mail}
    } catch(e){
      console.error('Erreur de connexion :', e.message);
      return undefined
    }
  }

  static async logout(req, res) {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: 'Aucun utilisateur connecté.' });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de la déconnexion.' });
        }
        res.status(200).json({ message: 'Déconnexion réussie.' });
      });
    } catch (e) {
      console.error('Erreur lors de la déconnexion :', e.message);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  }
  
}

export default User;