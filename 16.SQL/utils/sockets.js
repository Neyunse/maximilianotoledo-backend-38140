let { Server: SocketIO } = require("socket.io");
const config = require("../config/db");
const SQL = require('./sql')
const mensajesApi = new SQL(config.sqlite3, 'mensajes')
class Socket {
      static instance;
      constructor(http) {
            if (Socket.instance) {
                  return Socket.instance;
            }
            Socket.instance = this;
            this.io = new SocketIO(http);
      }
      init() {
            try {
                  this.io.on('connection', async (socket) => {
                        this.io.sockets.emit("init", await mensajesApi.getAll());

                        socket.on("message", async (data) => {
                              await mensajesApi.save(data)
                              this.io.sockets.emit("server", await mensajesApi.getAll());
                        });

                  })
            } catch (error) {
                  console.log(error);
            }
      }
}


module.exports = Socket;