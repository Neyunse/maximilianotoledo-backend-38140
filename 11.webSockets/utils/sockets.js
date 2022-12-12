let { Server: SocketIO } = require("socket.io");
class Socket {
      static instance;
      constructor(http) {
            if (Socket.instance) {
                  return Socket.instance;
            }
            Socket.instance = this;
            this.io = new SocketIO(http);
            this.messages = [];
            this.users = [];
      }
      init() {
            try {
                  this.io.on('connection', socket => {
                        this.io.sockets.emit("init", this.messages);

                        socket.on("message", data => {
                              this.messages.push(data);
                              this.io.sockets.emit("server", this.messages);
                        });

                        socket.on("login", data => {
                              console.log(data);
                              if (this.users.length) {
                                    let user_verification = false;
                                    this.users = this.users.map(u => {
                                          if (u.email == data.email) {
                                                user_verification = true;
                                                return {
                                                      id: socket.id,
                                                      ...data,
                                                      active: true
                                                }
                                          } else {
                                                return u;
                                          }
                                    })
                                    if (!user_verification) {
                                          this.users.push({
                                                id: socket.id,
                                                ...data,
                                                active: true
                                          })
                                    }
                              } else {
                                    this.users.push({
                                          id: socket.id,
                                          ...data,
                                          active: true
                                    })
                              }
                     
                              this.io.sockets.emit("getUsers", this.users);
                        });

                        socket.on("disconnect", () => {
                              
                              this.users = this.users.map(u => {
                                    if (u.id == socket.id) {
                                          delete u.active;
                                          return {
                                                ...u,
                                                active: false
                                          }
                                    } else {
                                          return u;
                                    }
                              });
                              this.io.sockets.emit("getUsers", this.users);
                        })

                       
                  })
            } catch (error) {
                  console.log(error);
            }
      }
}


module.exports = Socket;