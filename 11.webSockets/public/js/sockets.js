
let socket = null;
let user = null;


let messageInput = document.querySelector("[data-message]");
let send = document.querySelector("[data-sendmessage]");
let chat = document.querySelector(".chat");
let messages = document.querySelector("[data-messageList]");
let login = document.querySelector("[data-login]");

messageInput.addEventListener("change", (e) => {
      if (messageInput.value != "") {
            send.classList = "btn btn-primary send show-button"
      } else {
            send.classList.remove("show-button");
      }
});

function readSockets() {
      getChat();
      socket.on("server", data => {
            getData(data);
      });
}

function getChat() {
      socket.on("init", data => {
            getData(data);
      })
}

function getData(data) {
      let innerP = ``;
      console.log(data);
      data.forEach(element => {

            innerP += `<article><span style="color: #004cff;font-weight: bold;">(${element.date})</span><span style="color: brown;">[${element.name}] </span> <span style="color: green;font-style: italic;">${element.message}</span> </article>`;
      });
      messages.innerHTML = innerP;
}


login.addEventListener("submit", evt => {
      evt.preventDefault();
      user = {
            name: evt.target[0].value,
            email: evt.target[1].value
      }
      if (user.name == "" || user.email == "") window.location.reload();
      socket = io();
      socket.emit("login", user);
      chat.classList = "active";
      login.classList = "hide-form";
      readSockets();
});


send.addEventListener("click", evt => {
      let sendMessage = {
            ...user,
            message: messageInput.value,
            date: moment().format('DD/MM/YYYY HH:MM:SS')
      }
      socket.emit("message", sendMessage);
      messageInput.value = "";
});