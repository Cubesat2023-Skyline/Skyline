// Handle_log.js
class BME_log {
  constructor(bme) {
    this.bme = bme;
  }

  handleLogs(match) {
    let data = match;
    let csvData = ''; // Accumulated CSV data
    const getValueFromBMEButton = document.getElementById('get_value_from_bme');
    const bmeLogButton = document.getElementById('bme_log');
    let header_state = false;

    getValueFromBMEButton.addEventListener('click', () => {
      const bmeData = this.get_value_from_bme(data);
      this.appendToCSV(bmeData);
    });

    bmeLogButton.addEventListener('click', () => {
      this.downloadCSV();
      header_state = false;
    });

    this.appendToCSV = (data) => {
      const csvLine = this.convertToCSV(data);
      csvData += csvLine;
    };

    this.downloadCSV = () => {
      const blob = new Blob([csvData], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      a.download = `bme_data_${timestamp}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    this.convertToCSV = (data) => {
      const header = Object.keys(data).join(',');
      const values = Object.values(data).join(',');
      if (header_state) {
        return `${values}\n`;
      } else {
        header_state = true;
        return `${header}\n${values}\n`;
      }
    };

    this.get_value_from_bme = (data) => {
      const new_data = parseFloat(data[0].replace("(", "").replace(")", "")).toFixed(4);
      const new_data2 = this.bme.convert_raw2engineering_data(new_data);
      return {
        ALTITUDE: this.bme.calculate_altitude(new_data2),
        AREA: this.bme.calculate_area(new_data2)
      }
    }
  }
}




class GPS_log {
  constructor(gps) {
    this.gps = gps;
  }

  handleLogs(match) {
    let csvData = ''; // Accumulated CSV data
    const getValueFromgpsButton = document.getElementById('get_value_from_gps');
    const gpsLogButton = document.getElementById('gps_log');
    let header_state = false;

    getValueFromgpsButton.addEventListener('click', () => {
      const gpsData = this.get_value_from_gps(match);
      this.appendToCSV(gpsData);
    });

    gpsLogButton.addEventListener('click', () => {
      this.downloadCSV();
      header_state = false;
    });

    this.appendToCSV = function (data) {
      const csvLine = this.convertToCSV(data);
      csvData += csvLine;
    };

    this.downloadCSV = function () {
      const blob = new Blob([csvData], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      a.download = `gps_data_${timestamp}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    this.convertToCSV = function (data) {
      const header = Object.keys(data).join(',');
      const values = Object.values(data).join(',');
      if (header_state) {
        return `${values}\n`;
      } else {
        header_state = true;
        return `${header}\n${values}\n`;
      }
    };

    // Added missing curly braces `{`
    this.get_value_from_gps = () => {
      const new_data = parseFloat(match[0].replace("(", "").replace(")", "")).toFixed(4);
      const new_data2 = this.gps.convert_raw2engineering_data(new_data);
      return {
        ALTITUDE: this.gps.calculate_altitude(new_data2),
        AREA: this.gps.calculate_area(new_data2)
      };
    };
  }
}

export { BME_log, GPS_log };
