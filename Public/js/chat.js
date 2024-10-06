const chatting_window = document.getElementById("chat-area");
const send_button = document.getElementById("send-button");
const attach_file_button = document.getElementById("attach");

const socket = io();

const roomId = window.location.pathname.split('/')[2];

let currentuser = prompt("Enter your Username");
if(currentuser == null){
    window.location.href = "about:blank";
}

socket.emit('join-room', {Id: roomId, name: currentuser});

socket.emit('notify-enter', {name: currentuser});


send_button.addEventListener("click", () => {
    const msg = document.getElementById("message-area").value;
    if(msg){
        socket.emit('chat-message', { user: currentuser, msg} );
        document.getElementById("message-area").value = "";
    }
});
attach_file_button.addEventListener("click", () => {
    alert("Js is working");
});

document.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        const msg = document.getElementById("message-area").value;
        if(msg){
            socket.emit('chat-message', {user: currentuser, msg});
            document.getElementById("message-area").value = "";
        } 
    };
});

socket.on('notify-leave', (info) => {
    console.log(`${info.name} has left the chat`);
    const msgDiv = document.createElement('div');
    msgDiv.classList.add("system-msg");
    msgDiv.textContent = `${info.name} has left the chat`;
    chatting_window.appendChild(msgDiv);
    chatting_window.scrollTop = chatting_window.scrollHeight;
});

socket.on('notify-enter', (info) => {
    console.log(`${info.name} has entered the chat`);
    const msgDiv = document.createElement('div');
    msgDiv.classList.add("system-msg");
    msgDiv.textContent = `${info.name} has entered the chat`;
    chatting_window.appendChild(msgDiv);
    chatting_window.scrollTop = chatting_window.scrollHeight;
});

socket.on('chat-message', (info) => {
    console.log("It is working");
    const newMessageBox = document.createElement("div");
    const newSenderAvatar = document.createElement("div");
    const newMessageContent = document.createElement("div");
    const newSenderName = document.createElement("div");
    const NewSenderMessageContent = document.createElement("div");

    newMessageBox.appendChild(newSenderAvatar);
    newMessageContent.appendChild(newSenderName);
    newMessageContent.appendChild(NewSenderMessageContent);
    newMessageBox.appendChild(newMessageContent);
    if(info.user === currentuser){
        newMessageBox.classList.add("sender-message-box");
    } else {
        newMessageBox.classList.add("message-box");
    }
    newSenderAvatar.classList.add("sender-avatar");
    newMessageContent.classList.add("message-content");
    newSenderName.classList.add("sender-name");

    NewSenderMessageContent.textContent = `${info.msg}`
    newSenderAvatar.textContent = `${info.user.toString().substring(0,1)}`;
    newSenderName.textContent = `${info.user}`;
    chatting_window.appendChild(newMessageBox);
    chatting_window.scrollTop = chatting_window.scrollHeight;
});
