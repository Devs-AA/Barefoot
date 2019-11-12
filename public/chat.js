const socket = io('http://localhost:9003');

socket.on('newUser', (data) => console.log(data));

const form = document.querySelector('#newForm');

const input = document.querySelector('#message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = input.value;
    socket.emit('message', data);
})
