const path = require('path');
const express = require('express');
const cookieParser = require("cookie-parser")                   // new
const csurf = require("csurf")                                  // new
const csrfProtection = csurf({ cookie: { httpOnly: true } })    // new

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
app.use(cookieParser())                               // new

// parse incoming JSON payloads
app.use(express.json())

// parse incoming JSON payloads
app.use(express.static(path.join(__dirname, "dist")))

// All routes end up with /dist/index.html
app.get("/", (req, res) => {
   res.sendFile(path.resolve(__dirname, "dist", "index.html"));
}); 

app.get("/login", csrfProtection, (req, res) => {
  const clients_email = req.cookies.simpletest;
  //console.log(req.cookies);
  if (req.cookies.simpletest) {
    const USER = selectAuthenticatedUserFromDB(clients_email);
    USER.status = "success";

    res.json(USER)
  } else {
    res.json({client:{}, status: "failure"});
  }
});


app.post("/secret", (req, res) => {
  
 
  const { userEmail, userPassword } = req.body;

    // Current user's email & password authentication
    const isValidated = authenticate(userEmail, userPassword);
  
    // Selecting a particular user object from DB of users
    const SELECTED_USER = selectAuthenticatedUserFromDB(userEmail);
    
    if ( isValidated ) {
    // imagine this next line where we set the cookie instead only happened if you had just provided a correct username and password etc...
    res.cookie("simpletest", userEmail, { httpOnly: false })
    
   res.json({ client: SELECTED_USER, status: "success" })
    
    } else {
      res.json({ client: {}, status: "failure" })
    }
  
});


app.get("/logout", (req, res) => {
  res.clearCookie("simpletest");
  console.log(req.cookies)
 
  return res.redirect("/");
});

app.use((err, req, res, next) => {
  if (err.code !== "EBADCSRFTOKEN") return next(err)

  res.status(403)
  res.send("CSRF attack detected!")
})



app.listen(process.env.PORT || 5000, () => console.log(`Server is On`));