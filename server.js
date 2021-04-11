const express = require("express");
var cors = require("cors");
const path = require("path");

// const { populateDatabase } = require("./db/populate");
// populateDatabase();

const app = express();

app.use(cors());

// Middleware
app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/gateway", require("./routes/gateway"));
app.use("/api/device", require("./routes/device"));
app.use("/api/messages", require("./routes/messages"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
