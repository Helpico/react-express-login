const path = require('path');
const express = require('express');
const session = require('express-session');
const csurf = require('csurf');

const app = express();

// JSON users' database
const USERS = [
  {email: "c1@example.com", password: "client"},
  {email: "c2@example.com", password: "client"},
  {email: "c3@example.com", password: "client"}
];

// Check if input email & password are present in users' DB
function authenticate(inputEmail, inputPassword) {
  let isUsr = USERS.some(usr => usr.email === inputEmail.trim() 
    && usr.password === inputPassword.trim());
  return isUsr;
}

// Select the user's data from big users' DB
function selectAuthenticatedUserFromDB(inputEmail) {
  let usr = USERS.find(usr => usr.email === inputEmail.trim());
  return usr;
}


// parse incoming traditional HTML form submits
app.use(express.urlencoded({ extended: false }))


app.use(
  session({
    // You could actually store your secret in your .env file
    secret: "supersecret difficult to guess string",
    cookie: {},
    resave: false,
    saveUninitialized: false
  })
)

/* app.use(csurf()) */

// parse incoming JSON payloads
app.use(express.json())

// parse incoming JSON payloads
app.use(express.static(path.join(__dirname, "dist")))

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.get("/secret", (req, res) => {
  let email = "c1@example.com";
  let password = "client";

  if (req.session.userEmail) {
    email = req.session.userEmail;
    password = req.session.userEmail;
  }

  res.send('<h1>Welcome, ${email}!</h1>')
});

app.post("/secret", (req, res) => {

  const { userEmail, userPassword } = req.body;

  // Store into session's cookies
  req.session.userEmail = userEmail.trim();

  // Current user's email & password authentication
  const isValidated = authenticate(userEmail, userPassword);

  // Selecting a particular user object from DB of users
  const SELECTED_USER = selectAuthenticatedUserFromDB(userEmail);
  
  if ( isValidated ) {
    res.json({ client: SELECTED_USER, status: "success" })
  } else {
    res.json({ client: {}, status: "failure" })
  }
});

app.listen(process.env.PORT || 5000, () => console.log(`Server is On`));