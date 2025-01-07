Random random = new Random();

Console.WriteLine("Hello, World!");

int num1 = 0;
int num2 = 0;
int sum = 0;
bool run = true;

void Start()
{
    Randomize();
    Check();
}

void Randomize()
{
    num1 = random.Next(1,101);
    num2 = random.Next(1,101);
    sum = num1 + num2;
}

void Check()
{
    if (sum <= 10)
    {
        Console.WriteLine(true + ". Sum: " + sum);
        run = false;
    }
    else
    {
        Console.WriteLine(false + ". Sum: " + sum);
    }
}

while (run == true)
{
    Start();
}
