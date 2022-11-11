const fs = require('fs')
const path = require('path');
const uniqid = require('uniqid');
class Container {
      constructor(file) {
            this.file = path.resolve(__dirname, file)
      }


      /**
       * It reads the file, and if it's not empty, it returns the parsed JSON.
       * @returns An array of objects.
       */
      async getAll() {
            const rq = await fs.promises.readFile(this.file, { encoding: 'utf8' })

            return rq ? JSON.parse(rq) : []
      }

      /**
       * It takes an object, adds an id to it, then writes it to a file.
       * @param obj - The object you want to save
       * @returns The id of the object that was saved.
       */
      async save(obj) {
            const products = await this.getAll()
            obj.id = uniqid()
            if (products.length >= 0) {
                  let writeFile = [...products, obj]
                  let stringify = JSON.stringify(writeFile, null, 2)
                  await fs.writeFile(this.file, stringify, (err) => {
                        if (err) console.error(err);
                        console.log(`File written successfully, you can check the file here: ${this.file}`);
                        console.log(`Your product id is: ${obj.id}`)
                  });

                  return obj

            }

            let stringify = JSON.stringify(obj, null, 2)
            await fs.writeFile(this.file, [stringify], (err) => {
                  if (err) console.error(err);
                  console.log(`File written successfully, you can check the file here: ${this.file}`);
                  console.log(`Your product id is: ${obj.id}`)
            });

            return obj
      }

      /**
       * It gets all the products and then finds the product with the id that matches the id that was
       * passed in
       * @param id - The id of the product you want to find
       * @returns The product with the id that was passed in.
       */
      async getByID(id) {
            try {
                  const products = await this.getAll()
                  let find = products.find(product => product.id === id)
                  return find ? find : `Something strange happened and the programmer of this code was not at fault and could not find the product with this id: ${id}`
            } catch (error) {
                  console.log(error)
            }
      }


      /**
       * It gets all the products, finds the product with the id that matches the id passed in, filters
       * out the product with the matching id, and then writes the new array to the file
       * @param id - The id of the product you want to delete
       */
      async deleteById(id) {
            const products = await this.getAll()
            const searchSingle = products.find(element => element.id == id)
            const filterRemove = products.filter(element => element != searchSingle)
            try {
                  let stringify = JSON.stringify(filterRemove, null, 2)
                  await fs.writeFile(this.file, stringify, (err) => {
                        if (err) console.error(err);
                        console.log(`File written successfully, you can check the file here: ${this.file}`);
                        console.log(`Your product id ('${id}') was successfully removed`)
                  });
            } catch (error) {
                  console.error(error)
            }
      }

      /**
       * It deletes all the data in the file
       */
      async deleteAll() {
            await fs.writeFile(this.file, "[]", (err) => {
                  if (err) console.error(err);
                  console.log(`File written successfully, you can check the file here: ${this.file}`);
                  console.log("All products was successfully deleted")
            });

      }

      async getRandom() {
            const products = await this.getAll()
            return products ? products[Math.floor(Math.random() * products.length)] : null
      }

}

const Product = new Container("products.json")


module.exports = Product