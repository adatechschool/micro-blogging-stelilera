import User from "../model/userModel";

export async function handleGetAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
    }
  }
  