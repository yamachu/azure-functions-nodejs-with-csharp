using System;
using System.Runtime.CompilerServices;

namespace Sample
{
    public class HttpTrigger
    {
        public static void Main(string[] args)
        {
        }

        [MethodImpl(MethodImplOptions.NoInlining)]
        public static string ResponseMessageTemplate(string src)
        {
            return $"Hello, {src}. This HTTP triggered function executed successfully.";
        }
    }
}