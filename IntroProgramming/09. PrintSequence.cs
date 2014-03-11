using System;

class PrintSequence
{
    static void Main()
    {
        for (int i = 2; i < 12; i++)
        {
            Console.WriteLine("{0}", i % 2 == 0 ? i : -i);
        }
    }
}
