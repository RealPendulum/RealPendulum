using System.Diagnostics;
using Newtonsoft.Json.Linq;

namespace RealPendulumApi;

public class ODESolver
{
  public Solution Solve()
  {
    Stopwatch stopwatch = Stopwatch.StartNew();

    var pythonOutput = RunPythonODESolver();

    string output = pythonOutput.StdOut;
    string error = pythonOutput.StdErr;

    Console.Error.WriteLine(error);

    var jsonObject = JObject.Parse(output);

    JArray y_t = (JArray)jsonObject["y"]!;
    JArray t = (JArray)jsonObject["t"]!;

    var solution = new Solution
    {
      y_t = y_t.Select(j => (double)j).ToArray(),
      t = t.Select(j => (double)j).ToArray()
    };

    stopwatch.Stop();
    Console.WriteLine($"Elapsed time: {stopwatch.ElapsedMilliseconds} ms");

    return solution;
  }

  private PythonOutput RunPythonODESolver()
  {
    ProcessStartInfo processStartInfo =
      new()
      {
        FileName = PythonUtils._pythonPath,
        Arguments =
          $"{PythonUtils._pythonOdeSolverPath} {Params.Duration} {Params.TimeStep} {Params.Acceleration} {Params.Length} {Params.InitialAngle} {Params.InitialSpeed} {Params.IsExact}",
        UseShellExecute = false,
        RedirectStandardOutput = true,
        RedirectStandardError = true,
        CreateNoWindow = true
      };

    Process process = new() { StartInfo = processStartInfo };
    process.Start();
    string output = process.StandardOutput.ReadToEnd();
    string error = process.StandardError.ReadToEnd();
    process.WaitForExit();

    return new PythonOutput { StdOut = output, StdErr = error };
  }

  public Parameters Params { get; set; } = new();
}

public class ApproxSolver
{
  public Solution Solve()
  {
    Stopwatch stopwatch = Stopwatch.StartNew();

    var pythonOutput = RunPythonApproxSolver();

    string output = pythonOutput.StdOut;
    string error = pythonOutput.StdErr;

    Console.Error.WriteLine(error);

    var jsonObject = JObject.Parse(output);

    JArray y_t = (JArray)jsonObject["y"]!;
    JArray t = (JArray)jsonObject["t"]!;

    var solution = new Solution
    {
      y_t = y_t.Select(j => (double)j).ToArray(),
      t = t.Select(j => (double)j).ToArray()
    };

    stopwatch.Stop();
    Console.WriteLine($"Elapsed time: {stopwatch.ElapsedMilliseconds} ms");

    return solution;
  }

  private PythonOutput RunPythonApproxSolver()
  {
    ProcessStartInfo processStartInfo =
      new()
      {
        FileName = PythonUtils._pythonPath,
        Arguments =
          $"{PythonUtils._pythonApproxSolverPath} {Params.Duration} {Params.TimeStep} {Params.Acceleration} {Params.Length} {Params.InitialAngle} {Params.InitialSpeed} {Params.IsExact}",
        UseShellExecute = false,
        RedirectStandardOutput = true,
        RedirectStandardError = true,
        CreateNoWindow = true
      };

    Process process = new() { StartInfo = processStartInfo };
    process.Start();
    string output = process.StandardOutput.ReadToEnd();
    string error = process.StandardError.ReadToEnd();
    process.WaitForExit();

    return new PythonOutput { StdOut = output, StdErr = error };
  }

  public Parameters Params { get; set; } = new();
}

public record Parameters
{
  public double Duration { get; set; }
  public double TimeStep { get; set; }
  public double Acceleration { get; set; }
  public double Length { get; set; }
  public double InitialAngle { get; set; }
  public double InitialSpeed { get; set; }
  public bool IsExact { get; set; }
}

public class Solution
{
  public double[] y_t;
  public double[] t;

  public ODEPoint[] ToODEPoints()
  {
    return y_t.Select((y, i) => new ODEPoint { Time = t[i], Value = y })
      .ToArray();
  }
}

public record ODEPoint()
{
  public double Time { get; init; }
  public double Value { get; init; }
}

struct PythonOutput
{
  public string StdOut { get; set; }
  public string StdErr { get; set; }
}

public static class PythonUtils
{
  public static readonly string _pythonPath = "python3";
  public static readonly string _pythonOdeSolverPath = "odeSolver.py";

  public static readonly string _pythonApproxSolverPath = "approxSolver.py";
}
