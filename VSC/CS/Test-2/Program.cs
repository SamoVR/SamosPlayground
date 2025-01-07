using System;

Random random = new Random();

Console.WriteLine("Program started!");

int GeneratedNumber = 0;

void GenerateNumber()
{
    GeneratedNumber = random.Next(0, 11);
    //Console.WriteLine(GeneratedNumber);
}

GenerateNumber();

while (true)
{
    string? guess = Console.ReadLine();
    if (guess == GeneratedNumber.ToString())
    {
        Console.WriteLine("You guessed correctly.");
        break;
    }
    else
    {
        Console.WriteLine("You guessed incorrectly.");
        break;
    }
}