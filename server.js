const express = require("express");
const path = require("path");

const db = require("./db");

const app = express();

// Middleware
app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
