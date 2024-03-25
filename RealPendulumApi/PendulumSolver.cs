using System.Diagnostics;
using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.OdeSolvers;

namespace RealPendulumApi;

public class ODESolver
{
  public static ODEPoint[] Solve(Parameters parameters)
  {
    return new ODESolver { Params = parameters }.SolveODE();
  }

  private ODEPoint[] SolveODE()
  {
    Stopwatch stopwatch = Stopwatch.StartNew();

    var y0 = Vector<double>.Build.Dense(
      [Params.InitialAngle, Params.InitialSpeed]
    );

    var start = 0;

    var N = (int)(Params.Duration * 1000 / Params.TimeStep);

    var solution = RungeKutta.SecondOrder(
      y0,
      start,
      Params.Duration,
      N,
      Params.IsExact ? PendulumExact : PendulumApprox
    );

    var timeStepInSeconds = Params.TimeStep / 1000;

    var points = solution
      .Select(
        (y, i) => new ODEPoint { Time = i * timeStepInSeconds, Value = y[0] }
      )
      .ToArray();

    stopwatch.Stop();
    // Console.WriteLine($"Elapsed time: {stopwatch.ElapsedMilliseconds} ms");

    return points;
  }

  private Parameters Params { get; set; } = new();

  private Vector<double> PendulumExact(double t, Vector<double> y)
  {
    return Vector<double>.Build.Dense(
      [y[1], -Params.Acceleration / Params.Length * Math.Sin(y[0])]
    );
  }

  private Vector<double> PendulumApprox(double t, Vector<double> y)
  {
    return Vector<double>.Build.Dense(
      [y[1], -Params.Acceleration / Params.Length * y[0]]
    );
  }
}

public class AnalyticSolver
{
  public static ODEPoint[] Solve(Parameters parameters)
  {
    return new AnalyticSolver(parameters).SolveAnalytic();
  }

  private ODEPoint[] SolveAnalytic()
  {
    Stopwatch stopwatch = Stopwatch.StartNew();

    var N = (int)(Params.Duration * 1000 / Params.TimeStep);

    var timeStepInSeconds = Params.TimeStep / 1000;

    var points = new ODEPoint[N]
      .Select(
        (_, i) =>
          new ODEPoint
          {
            Time = i * timeStepInSeconds,
            Value = PendulumApproxSolved(i * timeStepInSeconds)
          }
      )
      .ToArray();

    stopwatch.Stop();
    // Console.WriteLine($"Elapsed time: {stopwatch.ElapsedMilliseconds} ms");

    return points;
  }

  private double PendulumApproxSolved(double t)
  {
    return Amplitude * Math.Sin(Omega * t + PhaseShift);
  }

  private Parameters Params { get; set; } = new();

  private double Omega { get; set; }

  private double PhaseShift { get; set; }

  private double Amplitude { get; set; }

  private AnalyticSolver(Parameters parameters)
  {
    Params = parameters;
    Omega = Math.Sqrt(Params.Acceleration / Params.Length);
    if (Params.InitialSpeed == 0)
    {
      PhaseShift = Math.PI / 2 * Math.Sign(Params.InitialAngle);
      Amplitude = Params.InitialAngle;
    }
    else if (Params.InitialAngle == 0)
    {
      PhaseShift = 0;
      Amplitude = Params.InitialSpeed / Omega;
    }
    else
    {
      PhaseShift = Math.Atan(Params.InitialAngle * Omega / Params.InitialSpeed);
      Amplitude = Params.InitialSpeed / Omega / Math.Sin(PhaseShift);
    }
  }
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

public record ODEPoint()
{
  public double Time { get; init; }
  public double Value { get; init; }
}
