//frontend javascript here 
const socket = io('http://localhost:8000');
var audio = new Audio('ting.mp3')
const form = document.getElementById('send-container');//container where we are  
const messageinput = document.getElementById('msginp');//geting input msg from client 
const messagecontainer = document.querySelector(".container")//adding msg in container 

const append =(message,position)=>{
    const messageElement = document.createElement('div');//creating div
    messageElement.innerText= message;//adding msg in div
    messageElement.classList.add('msg');//setting class name
    messageElement.classList.add(position);//for css
    //now append element
    messagecontainer.append(messageElement)
        if(position=='left'){
            audio.play();
        }
}

//adding event  listener for the form submit 
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`YOU : ${message} `,'right');
    socket.emit('send',message);
    messageinput.value =""
})


const names = prompt("enter your name to join");
//sending the user 
socket.emit('new-user-joined',names);

socket.on('user-joined',name=>{
    //to broadcast msg to other users that user joined 
    append(`${name} joined the chat `,'right');
})

socket.on('receive',data=>{
   append(`${data.name}:${data.message}`,'left');

})

socket.on('left',name=>{
    append(`${name} left the chat`,'left');
})











