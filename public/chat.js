const socket = io('http://localhost:9003');
const form = document.querySelector('#newForm');
const display = document.querySelector('.display');
const input = document.querySelector('#message');

socket.on('new-chat-message', (data) => {
    console.log(data);
    const p = document.createElement('p');
    const span = document.createElement('s');
    span.textContent = data.username;
    p.textContent = data.message;
    p.appendChild(span);
    display.append(p);
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { message: input.value, username: 'username' };
    socket.emit('new-message', data);
});
