// Получение пользователей
fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(data => displayData(data, 'users'))
  .catch(err => handleError(err, 'users'));

// Получение постов
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(data => displayData(data, 'posts'))
  .catch(err => handleError(err, 'posts'));
function displayData(data, type) {
  const container = document.getElementById('data-container');
  container.innerHTML = `<h3>${type.toUpperCase()}</h3>`;
  data.slice(0, 5).forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${type === 'users' ? item.name : item.title}</strong><br>${item.email || item.body}`;
    container.appendChild(div);
  });
}
const socket = io('http://localhost:3000');
document.getElementById('send-btn').onclick = () => {
  const msg = document.getElementById('message-input').value;
  socket.emit('chat message', msg);
};
socket.on('chat message', msg => {
  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML += `<div>${msg}</div>`;
});
const eventSource = new EventSource('/events');
eventSource.onmessage = e => {
  const data = JSON.parse(e.data);
  document.getElementById('sse-box').innerHTML += `<div>${data.time}</div>`;
};
eventSource.onerror = err => handleError(err, 'SSE');
