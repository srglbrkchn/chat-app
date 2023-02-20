const socket = io("http://localhost:3000");

const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");
const name = prompt("What's your name?");

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

appendMessage("You joined!");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  if (data.message != "") {
    appendMessage(`${data.name}: ${data.message}`);
  }
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message);
  if (message != "") {
    appendMessage(`You: ${message}`);
    messageInput.value = "";
  }
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected... `);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected... `);
});
