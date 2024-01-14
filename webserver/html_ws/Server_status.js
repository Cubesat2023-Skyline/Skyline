//server.js
export function server_status(socket){
    const statusDiv = document.getElementById("status");
    statusDiv.textContent = "Status: Connecting...";
    // Handle connection opened
    socket.addEventListener("open", () => {
        document.getElementById("status").style.color = "green";
        statusDiv.textContent = "Status: Connected";
    });
    // Handle WebSocket close event
    socket.addEventListener("close", () => {
        statusDiv.textContent = "Status: Not Connected";
        document.getElementById("status").style.color = "red";
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML += "<p>Connection closed</p>";
    });
}