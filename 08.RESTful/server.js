const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

let endpoints = require("./api");

app.use(express.static('html'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors("*"));

endpoints(app);

app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`)
});
