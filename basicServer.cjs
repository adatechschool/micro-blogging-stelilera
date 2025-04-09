const express = require("express");

const app = express();
const port = 3002;

app.get("/test", (req, res) => {
  console.log("✅ Test route atteinte !");
  res.send("Test OK");
});

app.listen(port, () => {
  console.log(`Serveur test http://localhost:${port}`);
});
