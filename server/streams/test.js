// client.js
const WebSocket = require('ws');

const userId = 'yourUserId'; // Replace with the actual user ID
const ws = new WebSocket(`ws://localhost:8080/notifications?userId=${userId}`);

ws.on('message', (data) => {
  const change = JSON.parse(data);
  console.log(change);
});