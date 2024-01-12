// Moudle_switch
export function Handle_module_switch(socket, bmeStateChanged, gpsStateChanged) {
    const bme_switch = document.getElementById("bme_switch");
    const gps_switch = document.getElementById("gps_switch");

    bme_switch.addEventListener("change", () => {
        if (bme_switch.checked) {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send("tc;3063;1;0");
                bmeStateChanged(true);
            } else {
                alert("WebSocket connection is not open.");
                bme_switch.checked = !bme_switch.checked;
            }
        } else {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send("tc;3063;2;0");
                bmeStateChanged(false);
            } else {
                alert("WebSocket connection is not open.");
                bme_switch.checked = !bme_switch.checked;
            }
        }
    });

    gps_switch.addEventListener("change", () => {
        if (gps_switch.checked) {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send("tc;3022;1;0");
                gpsStateChanged(true);
            } else {
                alert("WebSocket connection is not open.");
                gps_switch.checked = !gps_switch.checked;
            }
        } else {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send("tc;3022;2;0");
                gpsStateChanged(false);
            } else {
                alert("WebSocket connection is not open.");
                gps_switch.checked = !gps_switch.checked;
            }
        }
    });
}
