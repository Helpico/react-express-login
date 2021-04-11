const path = require('path');
const express = require('express');
const app = express();

const USERS = [
  {email: "c1@example.com", password: "client"},
  {email: "c2@example.com", password: "client"},
  {email: "c3@example.com", password: "client"}
];

// Check if email & password are present in users' DB
function authenticate(inputEmail, inputPassword) {
  let usr = USERS.some(usr => usr.email === inputEmail 
    && usr.password === inputPassword);
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
  // Current user's email & password athentication
  let isValidated = authenticate(req.body.userEmail, req.body.userPassword);
  if ( isValidated ) {
    res.json({ message: "This Life is so good!", status: "success" })
  } else {
    res.json({ message: "You are not authorized.", status: "failure" })
  }
});

app.listen(process.env.PORT || 5000);