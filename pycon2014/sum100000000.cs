using System;

public class sum100000000
{
    static public void Main()
    {
        long sum = 0;
        for( long i=0; i<1000000000; i++ ) sum+=i;
        Console.WriteLine(sum);
    }
}