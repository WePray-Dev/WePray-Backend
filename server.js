const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const helmet = require('helmet')
const mongoose = require('mongoose');
const config = require('./app/config')

const app = express();

app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "wepray-session",
    keys: [config.cookie_session_secret],
    httpOnly: true
  })
);


mongoose.connect(`mongodb+srv://${config.db_username}:${config.db_password}@${config.db_host}/?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.once('open', (err, res) => {
  if(err) {
    console.error("Connection error", err);
    process.exit();
  }

  console.log("MONGO CONNECTED");
});

// simple route
app.get("/", (req, res) => {
  res.json({ 
    status : 'successful',
    message: 'This is We-Pray API',
    data: null
  });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}.`);
});
