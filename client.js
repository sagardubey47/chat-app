const socket = io('http://localhost:8000/');
const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageinp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('glass_ping-Go445-1207030150.mp3');

const append = (message,position)=>{
   const messageElement = document.createElement('div');
   messageElement.innerText = message;
   messageElement.classList.add('message');
   messageElement.classList.add(position);
   messageContainer.append(messageElement);
      
         audio.play();     
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send',message);
    messageinput.value =''
})
const name = prompt("enter your name to join");

socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`,'right')
})
   
socket.on('receive', data =>{
    append(`${data.message}: ${data.name}`,'left')
})
socket.on('left', name =>{
    append(`${name} left the chat`,'left')

});
