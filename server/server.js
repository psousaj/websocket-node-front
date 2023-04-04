const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    const blob = new Blob([message], { type: "text/plain" });
    blob.text().then((text) => {
      wss.clients.forEach(function each(client) {
        // if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(text);
        // }
      });
    });
  });
});

console.log("WebSocket server está rodando na porta 8080.");
