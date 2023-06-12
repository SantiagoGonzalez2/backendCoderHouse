const socket = io();


const chatBox = document.getElementById('chatBox');
const messageLogs = document.getElementById('messageLogs');

socket.on('chat:message1', (message) => {

  messageLogs.innerHTML += `<p>Dice: ${message}</p>`;
});

chatBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const message = chatBox.value;
    if (message.trim() !== '') {
      socket.emit('chat:message', message);
      chatBox.value = '';     }
  }
});
