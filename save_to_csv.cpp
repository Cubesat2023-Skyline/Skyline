#include <iostream>
#include <fstream>
#include <vector>
#include "calculate_area_from_height.h"
using namespace std;
void saveToCSV(const string &filename, const vector<vector<string>> &data) {
    ofstream outputFile(filename);
    if (!outputFile.is_open()) {
        cerr << "Error opening file: " << filename << endl;
        return;
    }
    for (const auto &row : data) {
        for (size_t i = 0; i < row.size(); ++i) {
            outputFile << row[i];
            if (i < row.size() - 1) {
                outputFile << ",";
            }
        }
        outputFile << "\n"; // Start a new line for each row
    }
    outputFile.close();
}
int main() {
    double altitude = 500.0; 
    string result = calculate(altitude);
    vector<vector<string>> data = {{"Altitude", "Area"}, {to_string(altitude), result}};
    string filename = "output.csv";
    saveToCSV(filename, data);
    return 0;
}