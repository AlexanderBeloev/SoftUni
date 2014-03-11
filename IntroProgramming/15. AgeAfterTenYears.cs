using System;

class AgeAfterTenYearsV2
{
    static void Main()
    {
        Console.Write("Please enter the day you were born: ");
        int dayBorn;
        while (!int.TryParse(Console.ReadLine(), out dayBorn) || dayBorn < 1 || dayBorn > 31) Console.WriteLine("You have entered an invalid day! Please try with days from 1 to 31");

        Console.Write("Please enter the month you were born in numeric format: ");
        int monthBorn;
        while (!int.TryParse(Console.ReadLine(), out monthBorn) || monthBorn < 1 || monthBorn > 12) Console.WriteLine("You have entered an invalid month! Please try with months from 1 to 12");

        Console.Write("Please enter the year you were born: ");
        int yearBorn;
        while (!int.TryParse(Console.ReadLine(), out yearBorn) || yearBorn < 1900 || yearBorn > 2005) Console.WriteLine("You have entered an invalid month! Please try with months between 1990 and 2005");

        var dateToday = DateTime.Today;
        var isEqual = dateToday.Day <= dayBorn && dateToday.Month >= monthBorn;

        if (isEqual)
        {
            Console.WriteLine("You'r born on {0}-{1}-{2}", dayBorn, monthBorn, yearBorn);
            Console.WriteLine("Now you are {0} years old.", DateTime.Now.Year - yearBorn);
            Console.WriteLine("After 10 years you will be {0}", DateTime.Now.Year - yearBorn + 10);
        }
        else
        {
            Console.WriteLine("You'r born on {0}-{1}-{2}", dayBorn, monthBorn, yearBorn);
            Console.WriteLine("Now you are {0} years old.", DateTime.Now.Year - yearBorn - 1);
            Console.WriteLine("After 10 years you will be {0}", DateTime.Now.Year - yearBorn + 9);
        }
    }
}