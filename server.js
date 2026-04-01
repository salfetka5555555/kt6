const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {
  console.log('Пользователь подключился');
  socket.on('chat message', msg => {
    io.emit('chat message', msg); // Рассылка всем
  });
});
server.listen(3000, () => console.log('WebSocket сервер запущен на порту 3000'));app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  const sendEvent = () => {
    const data = JSON.stringify({ time: new Date().toLocaleTimeString() });
    res.write(`data: ${data}\n\n`);
  };
  sendEvent();
  setInterval(sendEvent, 5000); // Отправка каждые 5 секунд
});
