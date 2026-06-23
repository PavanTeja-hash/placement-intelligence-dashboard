const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

const users = [];

app.get("/", (req, res) => {
  res.send("Hello from PlacementIQ Backend!");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    project: "PlacementIQ",
    backend: "running",
    version: "2.3.0",
    database: "MongoDB Connected",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  console.log("Before Push:", users);

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(409).json({
      message: "Email already registered",
    });
  }

  const user = {
    name,
    email,
    password,
  };

  users.push(user);

  console.log("After Push:", users);

  res.json({
    message: "Registration successful",
    user,
  });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id < 0 || id >= users.length) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(users[id]);
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id < 0 || id >= users.length) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const deletedUser = users.splice(id, 1);

  res.json({
    message: "User deleted successfully",
    user: deletedUser[0],
  });
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id < 0 || id >= users.length) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and Email are required",
    });
  }

  users[id] = {
    name,
    email,
  };

  res.json({
    message: "User updated successfully",
    user: users[id],
  });
});

app.patch("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id < 0 || id >= users.length) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const { name, email } = req.body;

  if (name !== undefined) {
    users[id].name = name;
  }

  if (email !== undefined) {
    users[id].email = email;
  }

  res.json({
    message: "User partially updated",
    user: users[id],
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  res.json({
    message: "Login successful",
    user,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
