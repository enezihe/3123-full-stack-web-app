const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8089;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// http://localhost:8089/hello
app.get("/hello", (req, res) => {
  res.type("text/plain").send("Hello Express JS");
});

// http://localhost:8089/user
app.get("/user", (req, res) => {
  const firstname = req.query.firstname || "Pritesh";
  const lastname  = req.query.lastname  || "Patel";
  res.json({ firstname, lastname });
});

// http://localhost:8089/user?firstname=John&lastname=Doe
app.post("/user/:firstname/:lastname", (req, res) => {
  const { firstname, lastname } = req.params;
  if (!firstname || !lastname) {
    return res.status(400).json({ error: "Both firstname and lastname are required in the path." });
  }
  res.status(201).json({ firstname, lastname });
});

// POST http://localhost:8089/users
app.post("/users", (req, res) => {
  const payload = req.body;
  if (!Array.isArray(payload)) {
    return res.status(400).json({ error: "Body must be an array of { firstname, lastname }" });
  }
  const invalid = payload.find(
    (u) => !u || typeof u.firstname !== "string" || typeof u.lastname !== "string"
  );
  if (invalid) {
    return res.status(400).json({ error: "Each user must include string fields: firstname and lastname." });
  }
  res.status(201).json(payload);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
