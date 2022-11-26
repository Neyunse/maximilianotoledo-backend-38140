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
            const pro = await products.save(body)

            res.json(pro)

      })

      router.put("/", async (req, res, next) => {
            let body = req.body
            const pro = await products.update(body)

            res.json(pro)
      })

      router.delete("/:id", async (req, res, next) => {
            const { id } = req.params
            try {
                  const pro = await products.delById(id)
                  if (pro === null) {
                        throw new Error(`The id ("${id}") does not refer to any registered product.`)
                  }
                  res.status(200).json({
                        error: {
                              code: 200,
                              message: `The product containing the following id ("${id}") was deleted.`
                        }
                  })
            } catch (error) {
                  res.status(404).json({
                        error: {
                              code: 404,
                              message: error.message
                        }
                  })
            }
      })
}