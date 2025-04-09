import express from "express";

const app = express();
const port = 3001;

app.get('/test', (req, res) => {
  console.log("✅ Route test atteinte !");
  res.send("Test OK");
});

app.listen(port, () => {
  console.log(`Serveur test sur http://localhost:${port}`);
});
