//from altitude
// wide_x=66deg ,wide_y=41deg <- camera spec
#include <bits/stdc++.h>
using namespace std;

double deg(double degree){
     double PI = 3.14159265359;
    return degree*(PI/180.0);
}

string calculate(double altitude){
    double real_height = altitude*tan(deg(41))*2;
    double real_width = altitude*tan(deg(66))*2;
    string ans = to_string(real_height*real_width/1000000); //convert to km in string
    return ans;
}
main(){
    cin.sync_with_stdio(0);cin.tie(0); //just optimize
    double altitude;cin>>altitude; // m
    cout << calculate(altitude) << " km^2";
    return 0;
}