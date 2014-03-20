using System;
using System.Collections.Generic; // list needs it to work with it
using System.Linq;
using System.Text;
using System.Threading;

struct Object
{
    public int x;
    public int y;
    public string c;
    public ConsoleColor color;
}

class FallingRocks
{
    static void PrintOnPosition (int x, int y, string c, ConsoleColor color = ConsoleColor.Gray)
    {
        Console.SetCursorPosition(x, y);
        Console.ForegroundColor = color;
        Console.Write(c);
    }
    static void PrintStringOnPosition(int x, int y, string str,
         ConsoleColor color = ConsoleColor.Red)
    {
        Console.SetCursorPosition(x, y);
        Console.ForegroundColor = color;
        Console.Write(str);
    }
    static void Main()
    {
        Console.BufferHeight = Console.WindowHeight = 30;
        Console.BufferWidth = Console.WindowWidth = 40;
        int playfieldWidth = 40;

        Object userObject = new Object();

        userObject.x = 2;
        userObject.y = Console.WindowHeight - 1;
        userObject.c = "(0)";
        
        userObject.color = ConsoleColor.Yellow;

        Random randomGenerator = new Random();

        List<Object> Objects = new List<Object>();

        while (true)
        {
            // draw the rocks
            Object drawRock = new Object();
            drawRock.color = ConsoleColor.Green;
            drawRock.x = randomGenerator.Next(0, playfieldWidth);
            drawRock.y = 0;
            string[] rockTypes = { "^", "@", "*", "&", "+", "%", "$", "#", "!", ".", ";", "-", "^^", "@@", "**", "&&", "++", "%%", "$$", "##", "!!", "..", ";;", "--"};
            drawRock.c = rockTypes[randomGenerator.Next(0, 21)];
            Objects.Add(drawRock);

            // mover the space ship
            while (Console.KeyAvailable)
            {
                ConsoleKeyInfo pressedKey = Console.ReadKey(true);
                if (pressedKey.Key == ConsoleKey.LeftArrow)
                {
                    if (userObject.x - 1 >= 0)
                    {
                        userObject.x = userObject.x - 1;
                    }
                }
                else if (pressedKey.Key == ConsoleKey.RightArrow)
                {
                    if (userObject.x + 1 < playfieldWidth)
                    {
                        userObject.x = userObject.x + 1;
                    }
                }
            }        
            // move the rocks
            List<Object> newList = new List<Object>();
            for (int i = 0; i < Objects.Count; i++)
            {
                Object oldRock = Objects[i];
                Object newRock = new Object();
                newRock.x = oldRock.x;
                newRock.y = oldRock.y + 1;
                newRock.c = oldRock.c;
                newRock.color = oldRock.color;
                int length = newRock.c.Length;
                // check if rock has hitted us
                if (length == 1)
                {
                    if ((newRock.x == userObject.x || newRock.x == userObject.x + 1 || newRock.x == userObject.x + 2) && newRock.y == userObject.y)
                    {
                        Console.Clear();
                        PrintStringOnPosition(8, 10, "GAME OVER!!!");
                        PrintStringOnPosition(8, 12, "Press [enter] to exit");
                        Console.ReadLine();
                        Environment.Exit(0);
                    }
                    if (newRock.y < Console.WindowHeight)
                    {
                        newList.Add(newRock);
                    }
                }
                else if (length == 2)
                {
                    if ((newRock.x == userObject.x + 1 || newRock.x == userObject.x + 2 || newRock.x + 1 == userObject.x || newRock.x + 1 == userObject.x + 1 || newRock.x + 1 == userObject.x + 2) && newRock.y == userObject.y)
                    {
                        PrintStringOnPosition(8, 10, "GAME OVER!!!");
                        PrintStringOnPosition(8, 12, "Press [enter] to exit");
                        Console.ReadLine();
                        Environment.Exit(0);
                    }
                    if (newRock.y < Console.WindowHeight)
                    {
                        newList.Add(newRock);
                    }
                }
            }
            Objects = newList;
            // clear the console
            Console.Clear();
            // redraw the playground
            PrintOnPosition(userObject.x, userObject.y, userObject.c, userObject.color = ConsoleColor.Red);
            foreach (Object rock in Objects)
            {
                    PrintOnPosition(rock.x, rock.y, rock.c, rock.color);
            }
            // slow down the program
            Thread.Sleep(150);
        }
    }
}
