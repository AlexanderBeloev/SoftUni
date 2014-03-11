using System;

class PrintLongSequence
{
    static void Main()
    {
        Console.BufferHeight = 1001; 
        for (int i = 2; i < 1002; i++)
        {
            Console.WriteLine("{0}", i % 2 == 0 ? i : -i);
        }
    }
}