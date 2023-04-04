const ws = new WebSocket("ws://localhost:8080");

ws.addEventListener("open", (event) => {
  console.log("Conectado ao servidor WebSocket.");

  const form = document.getElementById("form");
  const messageInput = document.getElementById("message-input");
  const nome = document.getElementById("nome");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const mensagem = String(`${nome.value} diz: ` + messageInput.value);
    ws.send(mensagem);

    const mm = mensagem;
    const messagesContainer = document.getElementById("messages");
    const messageElement = document.createElement("p");
    messageElement.innerText = mm;
    messagesContainer.appendChild(messageElement);

    messageInput.value = "";
  });
  ws.addEventListener("message", (event) => {
    const message = event.data;
    const reader = new FileReader();
    reader.addEventListener("loadend", (e) => {
      const text = new TextDecoder().decode(e.target.result);
      const messagesContainer = document.getElementById("messages");
      const messageElement = document.createElement("p");
      messageElement.innerText = text;
      messagesContainer.appendChild(messageElement);
    });
    reader.readAsArrayBuffer(message);
  });
});
