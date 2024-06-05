import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "dotenv";
import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1357Us@#",
  database: "test",
});

// Load environment variables
env.config();

// Create Express server
const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

// Parse JSON bodies for this app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Please fill in all the fields" });
  }

  try {
    db.query(
      "SELECT * FROM login WHERE username = ? AND password = ?",
      [username, password],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        if (result.length === 0) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        res.cookie("token", "12345", {
          httpOnly: true,
          sameSite: "strict",
        });
        return res.status(200).json(req.body);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// test route
app.get("/", (req, res) => {
  console.log("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
