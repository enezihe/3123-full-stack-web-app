const express = require("express");
const http = require("http");
const employee = require("./Employee");

const app = express();

app.use((req, res, next) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: http.STATUS_CODES[405] });
  }
  next();
});

app.get("/", (_req, res) => {
  res.type("html").send("<h1>Welcome to Lab Exercise 03</h1>");
});

app.get("/employee", (_req, res) => {
  res.json(employee.getAll());
});

app.get("/employee/names", (_req, res) => {
  res.json(employee.getNamesAsc());
});

app.get("/employee/totalsalary", (_req, res) => {
  res.json({ total_salary: employee.getTotalSalary() });
});

app.use((_req, res) => {
  res.status(404).json({ error: http.STATUS_CODES[404] });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});
