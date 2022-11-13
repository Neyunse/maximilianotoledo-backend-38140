const express = require('express')
const app = express()
const Product = require('./modules/products')
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
      res.send('Hello World!')
})

/* This is a route that will return all products from the database. */
app.get('/api/products', async (req, res) => {
      const all = await Product.getAll()
      res.json(all)
})

/* This is a route that will return a random product from the database. */
app.get('/api/products/random', async (req, res) => {
      const random = await Product.getRandom()
      res.json(random)
})


/* This is a catch-all route. It will catch any request that does not match any of the other routes. */
app.get('*', (req, res) => {
      res.status(404).json({
            error: {
                  code: 400,
                  type: 'Not Found',
                  message: 'This url does not exist.'
            }
      })
})


app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
})
