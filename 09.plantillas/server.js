const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views/ejs");
app.set("view engine", "ejs");

let products = []

app.get("/", (req, res, next) => {
      res.redirect("/products");
});


app.get("/products", (req, res, next) => {
      res.render("index", { products });
});

app.post("/products", (req, res, next) => {
      products.push(req.body);
      res.redirect("/");
});

app.listen(PORT);