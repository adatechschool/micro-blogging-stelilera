import express from "express";
import 'dotenv/config';
import { users } from "./routes/user.js";
import { posts } from './routes/post.js';
//import authCheck from "./middleware/authMiddleware.js";
import session from "express-session";
import path from 'path'; // importe le module path de Node.js, qui permet de manipuler les chemins de fichiers
import { fileURLToPath } from 'url'; // importe une fonction qui permet de retrouver le chemin du fichier actuel, pour ensuite pouvoir reconstruire __dirname

const app = express();
const port = process.env.PORT;

app.use(session({
  secret: 'your-secret-key',
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

// Route de test
// app.get('/', (req, res) => {
//   res.json({ message: 'API fonctionne correctement!' });
// });

app.get('/', (req, res) => {
  res.render('index', { title: 'Snappy' });
});
app.get('/login', (req, res) => {
  res.render('login', { title: 'Snappy' });
});
app.get('/register', (req, res) => {
  res.render('register', { title: 'Snappy' });
});
app.get('/profil_edit', (req, res) => {
  res.render('profil_edit', { title: 'Snappy' });
});

import multer from 'multer';
const upload = multer(); 
app.post('/profil_edit', upload.none(), (req, res) => {
  const newBio = req.body.bio;
  if (!newBio) {
    return res.status(400).json({ error: 'La biographie est vide.' });
  }
  console.log("Nouvelle biographie reçue :", newBio);
  res.json({ success: true, message: 'Biographie mise à jour.' });
});




app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port http://localhost:${port}`);
})
