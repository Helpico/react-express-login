const path = require('path');
const express = require('express');
const app = express();

// JSON users' database
const USERS = [
  {email: "c1@example.com", password: "client"},
  {email: "c2@example.com", password: "client"},
  {email: "c3@example.com", password: "client"}
];

// Check if input email & password are present in users' DB
function authenticate(inputEmail, inputPassword) {
  let usr = USERS.some(usr => usr.email === inputEmail 
    && usr.password === inputPassword);
  return usr;
}

// Select the user's data from big users' DB
function selectAuthenticatedUserFromDB(inputEmail) {
  let usr = USERS.find(usr => usr.email === inputEmail);
  return usr;
}


// parse incoming traditional HTML form submits
app.use(express.urlencoded({ extended: false }))

// parse incoming JSON payloads
app.use(express.json())

// parse incoming JSON payloads
app.use(express.static(path.join(__dirname, "dist")))

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});


app.post("/secret", (req, res) => {
  // Current user's email & password authentication
  const isValidated = authenticate(req.body.userEmail.trim(), req.body.userPassword.trim());

  // Selecting a particular user object from DB of users
  const SELECTED_USER = selectAuthenticatedUserFromDB(req.body.userEmail);
  
  if ( isValidated ) {
    res.json({ client: SELECTED_USER, status: "success" })
  } else {
    res.json({ client: {}, status: "failure" })
  }
});

app.listen(process.env.PORT || 5000, () => console.log(2222222222));