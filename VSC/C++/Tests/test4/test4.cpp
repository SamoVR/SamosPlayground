#include <iostream>
using namespace std;


//cin = input | cout = print
int main()
{
    int Number;

    std::cout << "PROGRAM STARTED | SamOS" << endl;

    cout << "Choose a number: ";
    cin >> Number;

    if (Number % 2 == 0)
    {
        cout << Number << " is even." << endl;
    }
    else
    {
        cout << Number << " is odd." << endl;
    }
    



    std::cout << "PROGRAM ENDED | SamOS";

    return 0;
}