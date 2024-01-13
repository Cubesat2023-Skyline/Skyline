


// class GPS_log {
//   constructor(gps) {
//     this.gps = gps;
//   }

//   handleLogs(new_data) {
//     let csvData = ''; // Accumulated CSV data
//     const getValueFromgpsButton = document.getElementById('get_value_from_gps');
//     const gpsLogButton = document.getElementById('gps_log');
//     let header_state = false;

//     getValueFromgpsButton.addEventListener('click', () => {
//       const gpsData = this.get_value_from_gps(new_data);
//       this.appendToCSV(gpsData);
//     });

//     gpsLogButton.addEventListener('click', () => {
//       this.downloadCSV();
//       header_state = false;
//     });

//     this.appendToCSV = function (data) {
//       const csvLine = this.convertToCSV(data);
//       csvData += csvLine;
//     };

//     this.downloadCSV = function () {
//       const blob = new Blob([csvData], { type: 'text/csv' });
//       const a = document.createElement('a');
//       a.href = URL.createObjectURL(blob);
//       const timestamp = new Date().toISOString().replace(/:/g, '-');
//       a.download = `gps_data_${timestamp}.csv`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     };

//     this.convertToCSV = function (data) {
//       const header = Object.keys(data).join(',');
//       const values = Object.values(data).join(',');
//       if (header_state) {
//         return `${values}\n`;
//       } else {
//         header_state = true;
//         return `${header}\n${values}\n`;
//       }
//     };

//     // Added missing curly braces `{`
//     this.get_value_from_gps = () => {
//       const new_data2 = this.gps.convert_raw2engineering_data(new_data);
//       return {
//         ALTITUDE: this.gps.calculate_altitude(new_data2),
//         AREA: this.gps.calculate_area(new_data2)
//       };
//     };
//   }
// }

export default  BME_log;
