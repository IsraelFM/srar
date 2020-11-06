// Get dependencies
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

// Get our API routes
const db = require("./models");
const api = require("./routes/api");
const app = express();

// Parsers for POST data
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cross Origin middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", api);

// Set our api routes;;
require('./routes/user.routes')(app);
require('./routes/accident.routes')(app);
require('./routes/event.routes')(app);
require('./routes/panicButton.routes')(app);

// Connect to mongodb
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Get port from environment and store in Express.
const port = process.env.PORT || "3000";
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));
