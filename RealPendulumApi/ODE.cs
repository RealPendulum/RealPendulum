using System.Diagnostics;
using Newtonsoft.Json.Linq;

public class MathNetExample
{
    public static double[] SolveRealODE(int duration, int timeStep)
    {
        const double acceleration = 9.81;
        const double length = 1;
        const double initialAngle = 0;
        const double initialSpeed = 2;
        const string pythonPath = "python3";
        const string pythonScriptPath = "real-ode.py";
        Stopwatch stopwatch = Stopwatch.StartNew();
        ProcessStartInfo processStartInfo = new ProcessStartInfo
        {
            // FileName = "python3",
            FileName = pythonPath,
            // Arguments = $"RealPendulumApi/pendulum.py {duration} {timeStep} {acceleration} {length} {initialAngle}",
            Arguments =
                $"{pythonScriptPath} {duration} {timeStep} {acceleration} {length} {initialAngle} {initialSpeed}",
            UseShellExecute = false,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            CreateNoWindow = true
        };

        Process process = new Process { StartInfo = processStartInfo };
        process.Start();
        string output = process.StandardOutput.ReadToEnd();
        string error = process.StandardError.ReadToEnd();
        process.WaitForExit();

        Console.WriteLine(error);

        JArray jsonArray = JArray.Parse(output);

        var y_t = jsonArray.Select(j => (double)j).ToArray();
        stopwatch.Stop();
        Console.WriteLine($"Elapsed time: {stopwatch.ElapsedMilliseconds} ms");

        return y_t;
    }

    public static double[] SolveFakeODE(int duration, int timeStep)
    {
        const double acceleration = 9.81;
        const double length = 1;
        const double initialAngle = 0;
        const double initialSpeed = 2;
        const string pythonPath = "python3";
        const string pythonScriptPath = "fake-ode.py";
        Stopwatch stopwatch = Stopwatch.StartNew();
        ProcessStartInfo processStartInfo = new ProcessStartInfo
        {
            FileName = pythonPath,
            Arguments =
                $"{pythonScriptPath} {duration} {timeStep} {acceleration} {length} {initialAngle} {initialSpeed}",
            UseShellExecute = false,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            CreateNoWindow = true
        };

        Process process = new Process { StartInfo = processStartInfo };
        process.Start();
        string output = process.StandardOutput.ReadToEnd();
        string error = process.StandardError.ReadToEnd();
        process.WaitForExit();

        Console.WriteLine(error);

        JArray jsonArray = JArray.Parse(output);

        var y_t = jsonArray.Select(j => (double)j).ToArray();
        stopwatch.Stop();
        Console.WriteLine($"Elapsed time: {stopwatch.ElapsedMilliseconds} ms");

        return y_t;
    }
}
