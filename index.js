const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');


const USERS = [
  {email: "client1@example.com", password: "client1"},
  {email: "client2@example.com", password: "client2"},
  {email: "client3@example.com", password: "client3"}
];

function getUserData(currentEmail) {
  let usr = USERS.find(u => u.email === currentEmail);
  return usr;
}
// clientInputData === "me@example.com" && req.body.userPassword == "me"



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
  if (req.body.userEmail === ) {
    res.json({ message: "This Life is so good!", status: "success" })
  } else {
    res.json({ message: "You are not authorized.", status: "failure" })
  }
});


app.listen(process.env.PORT || 5000);