const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const { Server: HttpServer } = require("http");
let Socket = require("./utils/sockets");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views/ejs");
app.set("view engine", "ejs");
app.use(express.static("./public"));

const config = require("./config/db");

const SQL = require('./utils/sql')
const productosApi = new SQL(config.mariaDb, 'productos')

app.get("/", (req, res, next) => {
      res.redirect("/products");
});


app.get("/products", async (req, res, next) => {
      const getAll = await productosApi.getAll()
      res.render("index", { getAll });
});

app.post("/products", async (req, res, next) => {
      await productosApi.save(req.body)
      res.redirect("/");
});

let httpServer = new HttpServer(app);
let socket = new Socket(httpServer);
socket.init();


httpServer.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));