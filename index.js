import express from "express";
import 'dotenv/config';
import { users } from "./routes/user.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(users);
app.use('/api', (req, res, next) => {
  console.log('🌐 Middleware API atteint');
  next();
}, users);

app.use('/api', users);
app.set('view engine', 'pug')
app.set('views', './views');

app.get('/', (req, res) => {
  console.log('Route / appelée'); // ← ce log doit apparaître dans le terminal
  res.render('index', { title: 'Bienvenue', message: 'Hello Stella !' });
});

app.get('/test', (req, res) => {
  console.log('✅ Route test atteinte');
  res.send('OK');
});


// // Route de test
// app.get('/', (req, res) => {
//   res.json({ message: 'API fonctionne correctement!' });
// });

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port http://localhost:${port}`);
});
