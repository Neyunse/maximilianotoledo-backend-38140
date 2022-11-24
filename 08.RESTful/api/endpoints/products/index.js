let { Router } = require("express")
const { Products } = require("../../Handlers")
const products = new Products("./DB/products.json");
let router = new Router()
module.exports = app => {
      app.use("/api/products", router);

      router.get("/", (req, res, next) => {
            const pro = products.getAll()
            res.json(pro)

      })

      router.get("/:id", (req, res, next) => {

            try {
                  const pro = products.getById(req.params["id"])

                  res.json(pro)

            } catch (err) {
                  res.status(400).json({
                        error: {
                              code: 400,
                              message: "Bad Request"
                        }
                  })
            }

      })

      router.post("/", (req, res, next) => {

      })

      router.put("/", (req, res, next) => {

      })

      router.delete("/id", (req, res, next) => {

      })
}