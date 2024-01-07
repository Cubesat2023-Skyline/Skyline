import BME_module from './BME.js'; 
import GPS_module from './GPS.js';
const bme = new BME_module();
const gps = new GPS_module();




// SERVER HANDLE

// document.getElementById("connectButton").addEventListener("click", () => {
 //   const serverUrl = document.getElementById("serverUrl").value;
   // connectWebSocket(serverUrl);
//});

let socket;
connectWebSocket("ws://192.168.1.47:3001"); // auto connect kub
function connectWebSocket(url) {
    socket = new WebSocket(url);

    // Update status
    const statusDiv = document.getElementById("status");
    statusDiv.textContent = "Status: Connecting...";

    // Handle connection opened
    socket.addEventListener("open", () => {
        document.getElementById("status").style.color = "green";
        statusDiv.textContent = "Status: Connected";
    });

    // Handle messages from the server
    socket.addEventListener("message", (event) => {
        const messagesDiv = document.getElementById("messages");
        messagesDiv.style.transition = "all .2s";
        messagesDiv.innerHTML += `<p>${event.data}</p>`;
        const match = event.data.match(/\((\d+)\)/);
        if (match){
            const new_data = parseFloat(match[0].replace("(","").replace(")","")).toFixed(4); //convert raw data to engineering data
            console.log("pressure in hpa: ",new_data);
            console.log("altitude: ",bme.calculate_altitude(new_data),"m");
            console.log("Area: ",bme.calculate_area(new_data)," km^2");
            
        }
    });
    // Handle WebSocket close event
    socket.addEventListener("close", () => {
        statusDiv.textContent = "Status: Not Connected";
        document.getElementById("status").style.color = "red";
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML += "<p>Connection closed</p>";
    });
}

// Handle form submission to send messages
document.getElementById("messageForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
    } else {
        alert("WebSocket connection is not open.");
    }
    messageInput.value = "";
});
