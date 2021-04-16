const path = require('path');
const express = require("express");
const session = require("express-session");
const store = new session.MemoryStore();
const app = express();

// Initialize session
app.use(session({
  secret: "some secret",
  cookie: {},
  resave: false,
  saveUninitialized: false,
  store
}));

// parse incoming JSON payloads
app.use(express.json())

// parse incoming traditional HTML form submits
app.use(express.urlencoded({ extended: false }))

// parse incoming JSON payloads
app.use(express.static(path.join(__dirname, "dist")))

// All routes end up with /dist/index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.post("/login", (req, res) => {
  req.session.user.email = req.body.email.trim();
  req.session.user.authenticated = true;
  res.json(req.ression);
});

app.listen(process.env.PORT || 5000, 
  () => console.log(`Server is on Port 5000`));