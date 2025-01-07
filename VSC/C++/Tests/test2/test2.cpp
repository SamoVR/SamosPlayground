#include <iostream>
using namespace std;

int main() {
    
    string name;
    int age;

    cout << "STARTED PROGRAM" << endl;

    cout << endl; //

    cout << "Input age: ";

    cin >> age;

    std::cout << "Input name: ";

    cin >> name;

    cout << endl; //
    cout << "-------INFO-BELOW-------" << endl;
    cout << endl; //

    cout << "Age: " << age << endl;
    cout << "Name: " << name << endl;

    cout << endl; //

    cout << "ENDED PROGRAM";


    return 0;
}