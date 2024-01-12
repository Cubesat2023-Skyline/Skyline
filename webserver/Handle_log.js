export function handleLogs() {
    let csvData = ''; // Accumulated CSV data
    const getValueFromBMEButton = document.getElementById('get_value_from_bme');
    const bmeLogButton = document.getElementById('bme_log');
    let header_state = false;

    getValueFromBMEButton.addEventListener('click', function () {
        const bmeData = get_value_from_bme();
        appendToCSV(bmeData);
    });

    bmeLogButton.addEventListener('click', function () {
        downloadCSV();
        header_state = false;
    });

    function appendToCSV(data) {
        const csvLine = convertToCSV(data);
        csvData += csvLine;
    }

    function downloadCSV() {
        const blob = new Blob([csvData], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        a.download = `bme_data_${timestamp}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function convertToCSV(data) {
        const header = Object.keys(data).join(',');
        const values = Object.values(data).join(',');
        if (header_state) {
            return `${values}\n`;
        } else {
            header_state = true;
            return `${header}\n${values}\n`;
        }
    }

    function get_value_from_bme() {
        const new_data = parseFloat(match[0].replace("(", "").replace(")", "")).toFixed(4);
        const new_data2 = bme.convert_raw2engineering_data(new_data);
        return {
            ALTITUDE: bme.calculate_altitude(new_data2),
            AREA: bme.calculate_area(new_data2)
        };
    }
}