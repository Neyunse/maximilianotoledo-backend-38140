const knex = require('knex')
const config = require('../config/db')

/* Creating a table in mariaDb database. */
try {
      const mariaDbClient = knex(config.mariaDb)

      await mariaDbClient.schema.dropTableIfExists('productos')

      await mariaDbClient.schema.createTable('productos', table => {
            table.increments('id').primary()
            table.string('title', 30).notNullable()
            table.float('price').notNullable()
            table.string('thumbnail', 1024)
      })

      await mariaDbClient.destroy()

      console.log('tabla productos en mariaDb creada con éxito')
} catch (error) {
      console.log('error al crear tabla productos en mariaDb')
      console.log(error)
}


/* Creating a table in sqlite3 database. */
try {
      const sqliteClient = knex(config.sqlite3)

      await sqliteClient.schema.dropTableIfExists('mensajes')

      await sqliteClient.schema.createTable('mensajes', table => {
            table.increments('id').primary()
            table.string('usuario', 30)
            table.string('mensaje', 128)
      })

      await sqliteClient.destroy()

      console.log('tabla mensajes en sqlite3 creada con éxito')
} catch (error) {
      console.log('error al crear tabla mensajes en sqlite3')
}