const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("API is working");
});

app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Shirt", price: 20 },
    { id: 2, name: "Pants", price: 30 },
    { id: 3, name: "Shoes", price: 50 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
