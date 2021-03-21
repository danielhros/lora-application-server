const express = require("express");
var cors = require("cors");

const app = express();

app.use(cors());

// Middleware
app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
