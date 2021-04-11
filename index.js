const path = require('path');
const express = require('express');
const app = express();


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
  if (req.body.username === "Denica") {
    res.json({ message: "The sky is blue.", status: "success" })
  } else {
    res.json({ message: "You are not authorized.", status: "failure" })
  }
});


app.listen(process.env.PORT || 5000);