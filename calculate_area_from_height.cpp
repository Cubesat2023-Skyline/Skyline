//from altitude
// wide_x=66deg ,wide_y=41deg
#include <bits/stdc++.h>
using namespace std;
double deg(double degree){
     double PI = 3.14159265359;
    return degree*(PI/180.0);
}
main(){
    cin.sync_with_stdio(0);cin.tie(0);
    double altitude;cin>>altitude;
    double real_height = altitude*tan(deg(41))*2;
    double real_width = altitude*tan(deg(66))*2;
    string ans = to_string(real_height*real_width/1000000);
    cout << ans;
    return 0;
}