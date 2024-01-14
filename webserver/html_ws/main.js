import BME_module from './BME.js'; 
import GPS_module from './GPS.js';
import { createBMELogHandler } from './BME_log.js';
import { createGPSLogHandler } from './GPS_log.js';
import { Handle_module_switch} from './Module_switch.js';
import { server_status } from './Server_status.js';
const bme = new BME_module();
const gps = new GPS_module();
let socket;
let bme_state;
let gps_state;
let data;

const gpsLogHandler = createGPSLogHandler(gps);
const bmeLogHandler = createBMELogHandler(bme);

// Event listeners can now be set up outside the function
const bmeLogButton = document.getElementById('bme_log');
const gpsLogButton = document.getElementById("gps_log");

bmeLogButton.addEventListener('click', () => {
    bmeLogHandler.downloadCSV();
});
gpsLogButton.addEventListener('click', ()=>{
    gpsLogHandler.downloadCSV();
})
connectWebSocket("ws://192.168.1.33:3001"); // auto connect kub

function connectWebSocket(url) {
    socket = new WebSocket(url);
    server_status(socket);
    // Handle messages from the server
    socket.addEventListener("message", (event) => {
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML += `<p>${event.data}</p>`;
        let match = event.data.match(/\((\d+)\)/);
        if (match){
            const new_data = parseFloat(match[0].replace("(","").replace(")","")).toFixed(4); //converbt raw data to engineering data
            data = new_data;
            if (event.data.substring(0,8)=="TM;3063;"){ //bme detection
                bmeLogHandler.addValue(data);
            }
            else if (event.data.substring(0,8)=="TM;3022;"){//gps detection
                gpsLogHandler.addValue(data); // Call the function from Handle_log.js

            }
        }
    });
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
// Call the function from Module_switch.js
Handle_module_switch(socket,  (newState) => {bme_state = newState;},  (newState) => {gps_state = newState;});
const get_value_from_bme = document.getElementById("get_value_from_bme");
const get_value_from_gps = document.getElementById("get_value_from_gps");
get_value_from_bme.addEventListener("click",()=>{
    if (bme_state){
        socket.send("tm;3063;3");
    }
    else{alert("bme280 not working");}
})
get_value_from_gps.addEventListener("click",()=>{
    if (gps_state){
        socket.send("tm;3022;5");
    }
    else{alert("gps not working");}
})
document.getElementById("connectButton").addEventListener("click", () => {
   const serverUrl = document.getElementById("serverUrl").value;
   if (serverUrl.trim()!=' ') {connectWebSocket(serverUrl); }
});