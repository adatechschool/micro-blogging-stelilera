import Post from "../model/postModel.js";

export async function handleGetAllPosts(req, res) {
    try {
      //const userId = req.session.user.id
      const posts = await Post.findAll();
      console.log(posts)
      res.render('index', { posts })
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des posts.' });
    }
  }

  export async function handleGetPostById(req, res) {
    try {
        const postId = req.params.id;
        const post = await Post.findOne(postId); 
        if (!post) {
            return res.status(404).json({ error: 'Post non trouvé' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du post.' });
    }
}
  
export async function handleDeletePost(req, res) {
    try {
        const postId = req.params.id;
        const deletedPost = await Post.delete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post non trouvé' });
        }
        res.status(200).json({ message: 'Post supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du post.' });
    }
}

  export async function handleCreatePost (req,res) {
    try{
      // const data = {...req.body, userId: req.session.user.id};
      // const posts = await Post.create(data);

      console.log("Session utilisateur :", req.session.user);
      console.log("ID utilisateur :", req.session.user?.id);

      if (!req.session.user || !req.session.user.id) {
        return res.status(401).send("Utilisateur non authentifié.");
    }

    if (!req.body.text) {
        return res.status(400).send("Le champ 'text' est requis.");
    }

    const userId = { connect: { id: req.session.user.id }}

      const postData = {
        text: req.body.text,
        image: req.body.image || null,
        users: userId // Associe le post à l'utilisateur
        //user_id: req.session.user.id
    };

    console.log("Données envoyées à Prisma :", JSON.stringify(postData, null, 2));

    const posts = await Post.create({
        data: postData,
        include: { users: true } // Assure l'inclusion des détails de l'utilisateur
    });


      res.render('index', { posts })
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de posts.' });
    }
    }