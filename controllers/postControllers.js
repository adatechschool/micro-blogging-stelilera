import Post from "../model/postModel.js";

export async function handleGetAllPosts(req, res) {
    try {
      const posts = await Post.findAll();
      console.log(posts)
      res.status(200).json(posts);
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
      const data = req.body;
      const posts = await Post.create(data);
      res.status(200).json(posts);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de posts.' });
    }
    }