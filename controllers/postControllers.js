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
  
  export async function handleCreatePost (req,res) {
    try{
      const data = req.body;
      //const id = req.params.id;
      const posts = await Post.create(data);
      res.status(200).json(posts);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de posts.' });
    }
    }