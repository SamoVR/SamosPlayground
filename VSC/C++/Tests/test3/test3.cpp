#include <iostream>
using namespace std;

//cout = print // cin = input
//std::cout

int main() 
{

    float Number1;
    float Number2;

    std::cout << "-- PROGRAM STARTED | SamOS --" << endl;
    cout << endl;

    cout << "Number 1: ";
    
    cin >> Number1;
    
    cout << "Number 2: ";

    cin >> Number2;

    cout << "Result: " << (Number1 + Number2) << endl;

    std::cout << "-- PROGRAM ENDED | SamOS --";

    return 0;
}
