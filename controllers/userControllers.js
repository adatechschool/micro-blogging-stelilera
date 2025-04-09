import User from "../model/userModel.js";

export async function handleGetAllUsers(req, res) {
  try {
    const users = await User.findAll();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs." });
  }
}

export async function handleCreateUser(req, res) {
  try {
    const data = req.body;
    await User.register(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500)
      .json({ error: "Erreur lors de la création de utilisateur." });
  }
}

export async function handleUpdateUser(req, res) {
  try {
    const userId = req.params.id;
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