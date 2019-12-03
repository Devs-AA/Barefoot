const socket = io('http://localhost:9003');
const form = document.querySelector('#newForm');
const display = document.querySelector('.display');
const input = document.querySelector('#message');
const typing = document.querySelector('#typing-mode');


const getChats = async () => {
  const res = await fetch('http://localhost:9003/api/v1/chat', {
    method: 'GET',
    headers: {
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNiwidXNlcm5hbWUiOiJyZXF1c3RlcjIiLCJlbWFpbCI6InJlcXVlc3RlcjJAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiRGFtZW9uIiwibGFzdE5hbWUiOiJTY2hvd2FsdGVyIiwibGFzdExvZ2luIjoiMjAxOS0xMS0xMlQwMjoyODo1OC4xNjFaIiwiaXNWZXJpZmllZCI6bnVsbCwicm9sZUlkIjo1LCJlbWFpbE5vdGlmaWNhdGlvbiI6dHJ1ZSwiZGVwYXJ0bWVudElkIjoyfSwiaWF0IjoxNTczNTI1Nzk2fQ.qbAbCoZVygVmETaYOYtB0W7AdQgl4fDnUWIjtFifoo0',

    }
  }
  );
  const data = await res.json();
  return data;
};


const populateChat = async () => {
  const { data, info } = await getChats();
  socket.user = info;
  socket.emit('new-user', info);
  data.forEach(({ message, username }) => {
    const msgContainer = document.createElement('div');
    const p = document.createElement('p');
    const span = document.createElement('s');
    span.textContent = username;
    p.textContent = message;
    msgContainer.appendChild(span);
    msgContainer.appendChild(p);
    display.append(msgContainer);
  });
};
populateChat();
socket.on('new-chat-message', (data) => {
  const msgContainer = document.createElement('div');
  const p = document.createElement('p');
  const span = document.createElement('s');
  span.textContent = data.username;
  p.textContent = data.message;
  msgContainer.appendChild(span);
  msgContainer.appendChild(p);
  display.append(msgContainer);
});

input.addEventListener('keydown', (e) => {
  socket.emit('keydown', '');
});

input.addEventListener('keyup', (e) => {
  socket.emit('keyup', '');
});

socket.on('typing', (info) => {
    typing.textContent = info;
});
socket.on('stopped-typing', () => {
    setTimeout(() => { typing.textContent = ''}, 10000)
});
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { userId, username } = socket.user;
  const data = { message: input.value, userId, username };
  socket.emit('new-message', data);
  input.value = '';
});
