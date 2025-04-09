import User from "../model/userModel.js";
import session from "express-session";

export async function handleGetAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
    }
  }
  
  export async function handleCreateUser (req, res) {
    try{
      const data = req.body;
      const user = await User.register(data);
      res.status(200).json(user);
    }catch(error){
    res.status(500).json({ error: 'Erreur lors de la création de utilisateur.' });
    }
  }

  export const handleLoginUser = async (req, res) => {
    try {
      const data = req.body;
      const user = await User.login(data);

      req.session.user = user // crée une session à l'utilisateur

      res.status(200).json({messsage: 'connexion reussie', user});
    } catch(e){
      res.status(500).json({ e: 'Erreur lors de la connexion de l\'utilisateur'})
    }
  }