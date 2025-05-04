import express from "express";
import 'dotenv/config';
import { users } from "./routes/user.js";
import { posts } from './routes/post.js';
import session from "express-session";
import path from 'path'; // importe le module path de Node.js, qui permet de manipuler les chemins de fichiers
import { fileURLToPath } from 'url'; // importe une fonction qui permet de retrouver le chemin du fichier actuel, pour ensuite pouvoir reconstruire __dirname
import loginCheck from "./middleware/loginMiddleware.js";
import db from './db/db.js';

//import multer from 'multer';

const app = express();
const port = process.env.PORT;

app.use(session({
  secret: 'your-secret-token',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 3600000 }
}));

app.use(express.static('public'));

const __filename = fileURLToPath(import.meta.url); // obtenir le chemin complet vers ton fichier actuel (index.js)
const __dirname = path.dirname(__filename); // obtenir le dossier dans lequel se trouve ce fichier

// Sert les fichiers statiques depuis "public"
app.use(express.static(path.join(__dirname, 'public'))); // tous les fichiers qui sont dans le dossier public/ sont accessibles publiquement.

app.use(express.json());
app.use(users);
app.use(posts);

// pug
app.set('view engine', 'pug');
app.set('views', './views');

app.post('/posts', (req, res) => {
  const user = req.session.user;
  console.log("User dans session :", user);
});


app.get('/login', (req, res) => {
  res.render('login', { title: 'Snappy' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Snappy' });
});
app.get('/profil_edit', loginCheck, (req, res) => {
  res.render('profil_edit', { title: 'Snappy' });
});

app.get('/logout', (req, res) => {
  res.clearCookie("connect.sid")
  res.render('login'), {title: 'Snappy'}
})

import multer from 'multer';
const upload = multer(); 
app.post('/profil_edit', upload.none(), async (req, res) => {
  const newBio = req.body.bio;
  const userId = req.session.user?.id;
  if (!newBio) {
    return res.status(400).json({ error: 'La biographie est vide.' });
  }
  try {
    await db.query('UPDATE users SET bio = $1 WHERE id = $2', [newBio, userId]);
    res.json({ success: true, message: 'Biographie mise à jour.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la biographie :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour.' });
  }
});


app.get('/profile', loginCheck, (req, res) => {
  res.render('profile', {
    title: 'Mon Profil | Snappy',
    });
});
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port http://localhost:${port}`);
})

export { app as server}
