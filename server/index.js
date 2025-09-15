const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

app.use(cors()); // habilita CORS

app.get("/", (req, res) => {
  res.send("API is working");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",        
  password: "Root",        
  database: "ecommerce"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

/* app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Shirt", price: 20 },
    { id: 2, name: "Pants", price: 30 },
    { id: 3, name: "Shoes", price: 50 }
  ]);
}); */

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
