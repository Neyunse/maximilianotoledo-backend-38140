class Usuario {
      constructor(nombre, apellido) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.libros = [];
            this.mascotas = [];
      }

      getFullName() {
            return `El nombre del usuario es: ${this.nombre} ${this.apellido}`;
      }

      addMascota(obString) {
            this.mascotas.push(obString)
            return this.mascotas
      }

      getCountMascotas() {

            return `Hay un total de ${this.mascotas.length} mascotas.`;
      }

      addBook(libro, creador) {
            this.libros.push({ nombre: libro, autor: creador })
      }

      getBookNames() {
            const BOOKS = this.libros.map(book => book)
            return BOOKS
      }
}

console.log("=========================")
let User = new Usuario("Luis", "Martinez")
console.log(User.getFullName())
console.log("=========================")
User.addMascota("Gato")
User.addMascota("Perro")
console.table(User.addMascota("Conejo"))
console.log("=========================")
console.log(User.getCountMascotas())
console.log("=========================")
User.addBook("Don Quijote de la Mancha", "Miguel de Cervantes")
User.addBook("Hamlet", "William Shakespeare")
User.addBook("La Divina Comedia", "Dante Alighieri")
console.table(User.getBookNames())
console.log("=========================")