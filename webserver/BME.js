class BME{
    constructor() {
        this.PI = 3.14159265359;
        this.seaLevelPressure = 1013.25;
        this.metersPerHectopascal = 8.3;
    }
    deg(degree) {
        return degree * (this.PI / 180.0);
    }
    convert_raw2engineering_data(pressure){
        return (raw*0.1);
    }
    calculate_from_altitude(altitude) {
        const real_height = altitude * Math.tan(this.deg(41)) * 2;
        const real_width = altitude * Math.tan(this.deg(66)) * 2;
        return (real_height * real_width / 1000000).toString(); // Convert to km in string
    }

    calculate_area(pressure) {
        pressure = this.convert_raw2engineering_data(pressure)
        const pressureDifference = this.seaLevelPressure - pressure;
        const altitude = pressureDifference * this.metersPerHectopascal;
        const area = this.calculate_from_altitude(altitude);
        return area;
    }

    calculate_altitude(pressure) {
        pressure = this.convert_raw2engineering_data(pressure);
        const pressureDifference = this.seaLevelPressure - pressure;
        return (pressureDifference * this.metersPerHectopascal).toFixed(4);
    }
}
export default BME;