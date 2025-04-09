import express from "express";
import 'dotenv/config';
import { users } from "./routes/user.js";
//import authCheck from "./middleware/authMiddleware.js";
import session from "express-session";

const app = express();
const port = process.env.PORT;

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 3600000 }
}));


app.use(express.json());
app.use(users);


// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API fonctionne correctement!' });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port http://localhost:${port}`);
});
