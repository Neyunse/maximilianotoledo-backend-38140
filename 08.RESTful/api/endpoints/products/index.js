let { Router } = require("express")
const { Products } = require("../../Handlers")
const products = new Products("./DB/products.json");
let router = new Router()
module.exports = app => {
      app.use("/api/products", router);

      router.get("/", async (req, res, next) => {
            const pro = await products.getAll()
            res.json(pro)

      })

      router.get("/:id", async (req, res, next) => {
            const { id } = req.params
            try {
                  const pro = await products.getById(id)
                  if (pro === null) {
                        throw new Error("Not found")
                  }

                  res.json(pro)
            } catch (error) {
                  res.status(404).json({
                        error: {
                              code: 404,
                              message: error.message
                        }
                  })
            }

      })

      router.post("/", async (req, res, next) => {
            let body = req.body
            try {
                  if (body) {
                        const pro = await products.save(body)

                        res.json(pro)
                  } else {
                        throw new Error("Bad Request")

                  }

            } catch (error) {
                  res.status(400).json({
                        error: {
                              code: 404,
                              message: error.message
                        }
                  })
            }
      })

      router.put("/", (req, res, next) => {

      })

      router.delete("/id", (req, res, next) => {

      })
}