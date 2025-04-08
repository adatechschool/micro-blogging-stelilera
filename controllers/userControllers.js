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
  