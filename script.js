const socket = io("http://localhost:3000");

const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

socket.on("chat-message", (data) => {
  console.log(data);
});
