const express = require("express");

const app = express();

app.use(express.json());

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

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and Email are required",
    });
  }

  res.json({
    message: "Registration successful",
    user: {
      name,
      email,
    },
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
