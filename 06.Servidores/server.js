const express = require('express')
const app = express()
const Product = require('./modules/products')
const port = 3000

app.get('/', (req, res) => {
      res.send('Hello World!')
})

app.get('/api/v1/products', async (req, res) => {
      const all = await Product.getAll()
      res.json(all)
})

app.get('/api/v1/products/random', async (req, res) => {
      const random = await Product.getRandom()
      res.json(random)
})


app.get('*', (req, res) => {
      res.status(404).json({
            'error': 'Not Found',
            'message': 'This url does not exist.'
      })
})


app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
})
