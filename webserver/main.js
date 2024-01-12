import BME_module from './BME.js'; 
import GPS_module from './GPS.js';
import { handleLogs } from './Handle_log.js';
import { Handle_module_switch } from './Module_switch.js';

const bme = new BME_module();
const gps = new GPS_module();
let socket;
let gps_state = false;
let bme_state = false;
let match = ''; //
match = connectWebSocket("ws://192.168.1.47:3001"); // auto connect kub
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
    match = socket.addEventListener("message", (event) => {
        const messagesDiv = document.getElementById("messages");
        messagesDiv.style.transition = "all .2s";

        messagesDiv.innerHTML += `<p>${event.data}</p>`;
        let match = event.data.match(/\((\d+)\)/);
        if (match){
            const new_data = parseFloat(match[0].replace("(","").replace(")","")).toFixed(4); //converbt raw data to engineering data
            if (event.data.substring(0,8)=="TM;3063;"){ //bme detection

            const new_data2 = bme.convert_raw2engineering_data(new_data);
            console.log("altitude: ",bme.calculate_altitude(new_data2),"m");
            console.log("Area: ",bme.calculate_area(new_data2)," km^2");
            
            }
            else if (event.data.substring(0,8)=="TM;3022;"){//gps detection
                console.log("altitude: ",gps.convert_raw2engineering_data(new_data),"m");
                console.log("Area: ",gps.calculate_area(new_data)," km^2");
            }
        }
    return match;
    });
    // Handle WebSocket close event
    socket.addEventListener("close", () => {
        statusDiv.textContent = "Status: Not Connected";
        document.getElementById("status").style.color = "red";
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML += "<p>Connection closed</p>";
    });
return match;
}
// Handle form submission to send messages
document.getElementById("messageForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;
    if ((socket && socket.readyState === WebSocket.OPEN) && message.trim() != '') {
        socket.send(message);
    } else {
        alert("Pls input command or WebSocket connection is not open");
    }
    messageInput.value = "";
    
});


//handle module switch
bme_state,gps_state = Handle_module_switch(socket,bme_state,gps_state); // Call the function from Module_switch.js kub P

const get_value_from_bme = document.getElementById("get_value_from_bme");
const get_value_from_gps = document.getElementById("get_value_from_gps");

get_value_from_bme.addEventListener("click",()=>{
    if (bme_state){
        socket.send("tm;3063;3");
    }
    else{
        alert("bme280 not working");
    }
})

get_value_from_gps.addEventListener("click",()=>{
    if (gps_state){
        socket.send("tm;3022;5");
    }
    else{
        alert("gps not working");
    }
})


// Handle log
document.addEventListener('DOMContentLoaded', function () {
    handleLogs(); // Call the function from Handle_log.js
});

// SERVER HANDLE
document.getElementById("connectButton").addEventListener("click", () => {
   const serverUrl = document.getElementById("serverUrl").value;
   connectWebSocket(serverUrl);
});