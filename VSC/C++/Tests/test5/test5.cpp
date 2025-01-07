#include <windows.h>
#include <iostream>
#include <cstdlib>
//#include <ctime> // Needed for time()

using namespace std;

string randomPrs;

string generatePrs() 
{
    srand((unsigned) time(NULL));
    int random = 1 + rand() % 3;
    string generatedPrs;

    if (random == 1)
    {
        generatedPrs = "Rock";  // Use '=' for assignment
    }
    else if (random == 2)
    {
        generatedPrs = "Paper";
    }
    else if (random == 3)
    {
        generatedPrs = "Scissors";
    }
    else
    {
        std::cout << "FATAL ERROR | generatePrs()" << endl;
    }

    return generatedPrs;  // Return the generated string
}

int main()
{
    string prs;
    string pressKey;

    std::cout << "PROGRAM STARTED | SamOS" << endl << endl;
    
    /////////////

    cout << "Press ENTER to start." << endl;
    cin.ignore();  // To wait for the Enter key
    cout << endl;
    cout << "Choose Paper/Rock/Scissors." << endl;
    cin >> prs;

    if (prs == "Scissors" || prs == "scissors")
    {
        prs = "Scissors";
    }
    else if (prs == "Rock" || prs == "rock")
    {
        prs = "Rock";
    }
    else if (prs == "Paper" || prs == "paper")
    {
        prs = "Paper";
    }
    else
    {
        cout << "Wrong symbol chosen!";
        return 0;
    }

    randomPrs = generatePrs(); 
    cout << "Opponent chose " << randomPrs << endl;

    if (prs == randomPrs)
    {
        cout << "It's a draw!";
    }
    else if (prs == "Rock" && randomPrs == "Paper")
    {
        cout << "You lost!";
    }
    else if (prs == "Paper" && randomPrs == "Rock")
    {
        cout << "You won!";
    }
    else if (prs == "Scissors" && randomPrs == "Paper")
    {
        cout << "You won!";
    }
    else if (prs == "Paper" && randomPrs == "Scissors")
    {
        cout << "You lost!";
    }
    else if (prs == "Rock" && randomPrs == "Scissors")
    {
        cout << "You won!";
    }
    else if (prs == "Scissors" && randomPrs == "Rock")
    {
        cout << "You lost!";
    }
    Sleep(5000);
    
    std::cout << endl << endl << "PROGRAM ENDED | SamOS";

    return 0;
}
