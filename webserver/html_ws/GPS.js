class GPS{
    constructor() {
        this.PI = 3.14159265359;
    }
    deg(degree) {
        return degree * (this.PI / 180.0);
    }
    convert_raw2engineering_data(raw){
        return (raw-1000000) *0.01;
    }
    calculate_area(altitude) {
        const real_height = altitude * Math.tan(this.deg(41)) * 2;
        const real_width = altitude * Math.tan(this.deg(66)) * 2;
        return (real_height * real_width / 1000000).toString(); // Convert to km in string
    }
}
export default GPS;