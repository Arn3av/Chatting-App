
const chat_button = document.getElementById("chat-link");
const buttons = document.getElementById("room-buttons");
const create_room_button = document.getElementById("create-room");
const copy_link_button = document.getElementById("copy-link");
const copy_status = document.getElementById("copy-status");
const link_address = document.getElementById("room-link");


create_room_button.addEventListener("click", () => {
    fetch('/create-room')
    .then(response => response.json())
    .then(data => {
        const roomLink = `${window.location.origin}${data.roomId}`;
        link_address.textContent = roomLink;
        create_room_button.style.display = "none";
        buttons.style.display = "flex";

        copy_link_button.addEventListener("click", () => {
            navigator.clipboard.writeText(roomLink);
            link_address.style.display = "inline";
            copy_status.textContent = "Link Copied !!!";
            copy_status.style.display = "inline";
        });
        
        chat_button.addEventListener("click", () => {
            window.location.href = roomLink;
        });

        
    });

    
})