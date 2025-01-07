#include <windows.h>
#include <iostream>
#include <string>

using namespace std;

string plrFirstName;
string plrLastName;
string basicFirstNames[] = {"Adam", "John", "Thomas", "James", "Jane", "Alex", "Jessica", "Sarah", "Elizabeth", "Mia"};
string basicLastNames[] = {"Beck", "Smith", "Doe", "Griffin", "Stone", "Bricks"};
const int numNames = 24;
string finalizedBasicNames[numNames];
string finalizedBasicGenders[numNames];

int generateRandomNumber(int rangeStart, int rangeEnd)
{
    int random = rangeStart + rand() % (rangeEnd - rangeStart);
    return random;
}

string generateRandomDate(int number) // will code later
{
    int yearNow = 2024;
    int finalYear = (yearNow - number);
    string finalDoB = "1/1/" + to_string(finalYear);


    return finalDoB;
}

int calculateHeight(string gender)
{
    if (gender == "Male")
    {
        return generateRandomNumber(170,190);
    }
    else
    {
        return generateRandomNumber(150,180);
    }
}

int calculateWeight(string gender)
{
    // 1kg = 2.204 pounds 
    if (gender == "Male")
    {
        return generateRandomNumber(85,120);
    }
    else
    {
        return generateRandomNumber(65,80);
    }
}

void assignGender(int i, string name)
{
    if (name == "Jane" || name == "Jessica" || name == "Sarah" || name == "Elizabeth" || name == "Mia")
    {
        finalizedBasicGenders[i] = "Female";
    }
    else
    {
        finalizedBasicGenders[i] = "Male";
    }
}

void generateRandomNames()
{
    int firstNamesSize = sizeof(basicFirstNames) / sizeof(basicFirstNames[0]);
    int lastNamesSize = sizeof(basicLastNames) / sizeof(basicLastNames[0]);

    for (int i = 0; i < numNames; i++)
    {
        string name = basicFirstNames[generateRandomNumber(0, firstNamesSize)];
        string lastname = basicLastNames[generateRandomNumber(0, lastNamesSize)];
        string finalName = name + " " + lastname;

        finalizedBasicNames[i] = finalName;
        assignGender(i, name);
    }

}

void Database()
{
    int action;
    int patientNumber;

    cout << "Opening database..." << endl;
    Sleep(1000);
    cout << endl << "-- REGISTERED PATIENTS --" << endl;

    for (int i = 0; i < numNames; i++)
    {
        cout << i << ". " << finalizedBasicNames[i] << endl;
    }

    cout << endl << endl << "DATABASE TERMINAL" << endl << "-- LIST OF ACTIONS --" << endl;
    cout << "If you would like to use any action please type in a number assigned to the action you wish to execute." << endl;
    cout << "1 - Register a new patient" << endl;
    cout << "2 - Remove a patient" << endl;
    cout << "3 - Check info about a patient" << endl;
    cout << "4 - Return" << endl;
    cin >> action;

    if (action == 1)
    {
        // Registration logic here
    }
    else if (action == 2)
    {
        // Removal logic here
    }
    else if (action == 3)
    {
        cout << "Please type in a number assigned to the patient you want to check info about." << endl;
        cin >> patientNumber;

        if (patientNumber >= 0 && patientNumber < numNames)
        {
            cout << endl << "-- " << "Patient #" << patientNumber << " --" << endl << endl;

            int generatedAge = generateRandomNumber(19, 55);
            string gender = finalizedBasicGenders[patientNumber];

            // Patients Information
            cout << "Full Name: " << finalizedBasicNames[patientNumber] << endl;
            cout << "Gender: " << gender << endl;
            cout << "Age: " << generatedAge << endl;
            cout << "Date of Birth: " << generateRandomDate(generatedAge) << endl;
            cout << "Height: " << calculateHeight(gender) << " Centimeters" << endl;
            cout << "Weight: " << calculateWeight(gender) << " Kilograms" << endl;
            cout << "Extremities: All limbs present and normally developed. No deformities or injuries." << endl;
            
            cout << endl << "-- Medical History --" << endl;
            if (generateRandomNumber(1,2) == 1)
            {
                cout << "Medical history is not accessible at this moment." << endl;
            }
            else
            {
                cout << "N/A" << endl;
            }

            // End of Patients Information
        }
        else
        {
            cout << "Invalid patient number." << endl;
        }
    }
    else if (action == 4)
    {
        // Return logic here
    }
    else
    {
        cout << "Invalid action.";
    }

    cout << endl << "Press ENTER if you wish to return back to list of actions." << endl;
    cin.ignore();
    cin.get();

}

void main()
{
    string action;

    srand((unsigned)time(NULL));

    std::cout << "PROGRAM STARTED | SamOS" << endl;
    cout << endl << "Welcome to MIS" << endl;
    cout << "Medical Innovative Systems" << endl;
    cout << "1994" << endl << endl;

    cout << "Press ENTER to continue." << endl;
    cin.ignore();

    generateRandomNames();

    cout << "Please enter your login credentials." << endl;
    cout << "First Name: ";
    cin >> plrFirstName;
    cout << "Last Name: ";
    cin >> plrLastName;
    cout << endl << "Welcome, Dr. " << plrFirstName << " " << plrLastName << ".";
    Sleep(3000);
    cout << endl << endl << "Fetching Security Clearance..." << endl;
    Sleep(1000);
    cout << "Your assigned Security Clearance is: " << "4" << endl;
    cout << endl << "MAIN TERMINAL" << endl << "-- LIST OF ACTIONS --" << endl;
    cout << "Database" << endl << "PLACEHOLDER" << endl << "PLACEHOLDER" << endl;
    cout << endl << "Choose an action by typing out action's name into the terminal." << endl;
    cin >> action;

    if (action == "Database" || action == "database")
    {
        Database();
    }
    else
    {
        cout << "Invalid action.";
    }
}
