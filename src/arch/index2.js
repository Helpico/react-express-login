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

// Middleware on system info
app.use((req, res, next) => {
  console.log(store);
  console.log(`${req.method} - ${req.url}`);
  next();
});

// Would-be database
const users = [
  {email: "c1@example.com", password: "client"},
  {email: "c2@example.com", password: "client"},
  {email: "c3@example.com", password: "client"}
];

app.post("/show", (req, res) => {
  const { userEmail, userPassword } = req.body;
  req.session.user = { userEmail, userPassword };
  req.session.authenticated = false;
  if (req.session.user.userEmail === "c3@example.com") {
    req.session.authenticated = true;
    res.json(req.session.authenticated);
  } else {
    res.json(req.session.authenticated);
  }
});


app.post("/login", (req, res) => {
  const { userEmail, userPassword } = req.body;
    
  if (userPassword === "client") {
    req.session.authenticated = true;
    req.session.user = { userEmail, userPassword };
    // console.log('REQ.SESSION:', req.session);
    res.json(req.session);
  } else if (req.session.user) {
    res.json(req.session);
  } else {
    res.sendStatus(403).json({ msg: "Bad Credentials" });
  }
 
 
  /* console.log(req.sessionID);
  const { userEmail, userPassword } = req.body;
  if (userEmail && userPassword) {
    if (req.session.authenticated) {
      res.json(req.session);
    } else {
      if (userPassword === 'client') {
        req.session.authenticated = true;
        req.session.user = { userEmail, userPassword };
        console.log('REQ.SESSION:', req.session);
        res.json(req.session);
      } else {
        res.sendStatus(403).json({ msg: "Bad Credentials" });
      }
    }
  } else res.status(403).json({ msg: "Bad Credentials" }); */


});

app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    // res.redirect("/");
    console.log("Session was destroyed");
    res.sendStatus(200);
  })
});

app.listen(process.env.PORT || 5000, 
  () => console.log(`Server is on Port 5000`));