import User from "../model/userModel.js";
import jwt from 'jsonwebtoken';

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
      let user = await User.login(data);

      const token = jwt.sign({ id: user.id, mail: user.mail }, 'your-secret-token', { expiresIn: '1h' }); // créer un token au user
      user.token = token

      req.session.user = user // crée une session à l'utilisateur
      res.status(200).json({messsage: 'connexion reussie', user });
      //res.render('index', { user })
    } catch(e){
      console.log('error retreive user')
      res.status(500).json({ e: 'Erreur lors de la connexion de l\'utilisateur'})
    }
  }

  export const handleLogoutUser = async (req, res) => {
    //req.session.user = undefined
    res.clearCookie("connect.sid")
    res.redirect("/logout")
  };
  

export async function handleUpdateUser(req, res) {
  try {
    const userId = parseInt(req.params.id);
    const data = req.body;

    console.log("Contrôleur: ID reçu =", userId);
    console.log("Contrôleur: Données reçues =", data);

    const updatedUser = await User.update(userId, data);

    console.log("Contrôleur: Mise à jour réussie =", updatedUser);
    res.status(200).json(updatedUser); // Renvoie l'utilisateur mis à jour, pas juste data
  } catch (error) {
    console.error("Erreur complète:", error);
    res.status(500)
      .json({ error: "Erreur lors de la modification de l'utilisateur." });
  }
}

export async function handleDeleteUser(req,res) {
  try {
    const userId = req.params.id;

    const deletedUser = await User.delete(userId);

    console.log("Contrôleur: Suppression réussie =", deletedUser);res.status(200)
    .json({ message: "Utilisateur supprimé avec succès", id: userId });
  } catch (error) {
    console.error("Erreur complète:", error);
    res.status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur." });
  }
}
