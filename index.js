const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API fonctionne correctement!' });
});



app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port http://localhost:${port}`);
});
