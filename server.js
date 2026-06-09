const express = require("express");

const app = express();

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
  });
});

app.post("/register", (req, res) => {
  const { name, email } = req.body;

  console.log("Before Push:", users);

  const user = { name, email };

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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
