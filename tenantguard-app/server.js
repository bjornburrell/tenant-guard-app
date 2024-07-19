const express = require("express");
const helmet = require("helmet");
const ejs = require('ejs');
const logger = require("./logger");
const app = express();
const path = require("path");

const PORT = 3000;

app.use(helmet());
app.set("trust proxy", true);
app.use(express.static(__dirname + "/public"));

// Set view engine
app.set('view engine', ejs);
app.set('views', path.join(__dirname, 'views'))

// Routes
app.use("/chat", require("./routes/chat"));
app.use('/', require('./routes/landing'));

app.all("*", (req, res) => {
  // send 404 page
  res.status(404).sendFile(path.join(__dirname, "public/404.html"));
});

const server = app.listen(PORT, () => {
  logger(`Server running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGTERM", () => {
  logger("Received SIGTERM Signal");
  server.close(() => {
    logger("Server Shutting Down");
  });
});

process.on("SIGINT", () => {
  logger("Received SIGINT Signal");
  server.close(() => {
    logger("Server Shutting Down");
  });
});
