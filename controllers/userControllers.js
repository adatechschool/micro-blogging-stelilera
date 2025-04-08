import User from "../model/userModel.js";

export async function handleGetAllUsers(req, res) {
    try {
      const users = await User.findAll();
      console.log(users)
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
    }
  }
  
  export async function handleCreateUser (req,res) {
    try{
      const data = req.body;
      await User.register(data);
      res.status(200).json(data);
    }catch(error){
    res.status(500).json({ error: 'Erreur lors de la création de utilisateur.' });
    }
  }