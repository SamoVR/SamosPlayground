#include <iostream>

using namespace std;

int n;

void randomN(int rangeStart, int rangeEnd)
{
    int number = rangeStart + rand() % (rangeStart - rangeEnd);
    n = number;
}

int main()
{
    srand((unsigned)time(NULL));
    int input;

    std::cout << "Program Started" << endl << endl;
    cout << "Press ENTER to start the game." << endl;
    cin.ignore();
    randomN(1,10);
    cout << "Guess a number between 1 to 10." << endl;
    cin >> input;
    if (input == n)
    {
        cout << "You won!" << endl;
    }
    else
    {
        cout << "You lost! The correct number was " << n << endl;
    }
    std::cout << "Program Ended";

}
