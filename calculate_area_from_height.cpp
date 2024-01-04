//calculate_area_from_height.cpp
//from altitude
// wide_x=66deg ,wide_y=41deg <- camera spec
#include "calculate_area_from_height.h"
#include <cmath>

double deg(double degree) {
    const double PI = 3.14159265359;
    return degree * (PI / 180.0);
}

std::string calculate(double altitude) {
    double real_height = altitude * tan(deg(41)) * 2;
    double real_width = altitude * tan(deg(66)) * 2;
    return std::to_string(real_height * real_width / 1000000); // Convert to km in string
}