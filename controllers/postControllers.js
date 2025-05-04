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

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function handleCreatePost(req, res) {
  try {
    // Récupération de l'utilisateur depuis la session
    const user = req.session.user;

    if (!user || !user.id) {
      return res.status(401).json({ error: "Utilisateur non connecté." });
    }

    const userId = user.id;
    const { text } = req.body;

    // Création du post en liant l'utilisateur via la relation Prisma
    const newPost = await prisma.posts.create({
      data: {
        text: text,
        users: {
          connect: { id: userId }
        }
      },
      include: { users: true }
    });

    res.status(201).json(newPost); // tu peux aussi faire un redirect ou render si tu préfères
    // res.render('index', {newPost})
  } catch (error) {
    console.error('Erreur lors de la création du post :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du post.' });
  }
}

export async function renderHome(req, res) {
  const posts = await prisma.posts.findMany({
    include: { users: true },
    orderBy: { id: 'desc' }
  });

  const postsWithName = posts.map(post => ({
    ...post,
    displayName: post.users?.name || 'Utilisateur inconnu'
  }));

  res.render('index', { posts: postsWithName });
}
