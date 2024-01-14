export  function createGPSLogHandler(gps) {
    let csvData = "Altitude(m),Area(km^2)\n";
    let data = null;

    function addValue(data) {
        const new_data2 = gps.convert_raw2engineering_data(data);
        const values = {
            Altitude: new_data2,
            Area: gps.calculate_area(new_data2)
        };
        csvData += `${Object.values(values).join(',')}\n`;
    }
  
    function downloadCSV() {
      const blob = new Blob([csvData], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      a.download = `gps_data_${timestamp}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  
      return {
        addValue,
        downloadCSV
    };
}