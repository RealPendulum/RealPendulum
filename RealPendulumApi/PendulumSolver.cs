using MathNet.Numerics.LinearAlgebra;

namespace RealPendulumApi;

public class OdeSolver
{
  public static Solution Solve(Parameters parameters)
  {
    return new OdeSolver { Params = parameters }.SolveODE();
  }

  private Solution SolveODE()
  {
    var y0 = Vector<double>.Build.Dense(
      [Params.InitialAngle, Params.InitialSpeed]
    );

    var timeStepInSeconds = Params.TimeStep / 1000;

    var solution = SecondOrder(
      y0,
      timeStepInSeconds,
      Params.IsExact ? PendulumExact : PendulumApprox
    );

    return solution;
  }

  private Parameters Params { get; set; } = new();

  private Vector<double> PendulumExact(Vector<double> y)
  {
    return Vector<double>.Build.Dense(
      [y[1], -Params.Acceleration / Params.Length * Math.Sin(y[0])]
    );
  }

  private Vector<double> PendulumApprox(Vector<double> y)
  {
    return Vector<double>.Build.Dense(
      [y[1], -Params.Acceleration / Params.Length * y[0]]
    );
  }

  /// <summary>
  /// Taken from `MathNet.Numerics.OdeSolvers.RungeKutta`
  /// </summary>
  public static Solution SecondOrder(
    Vector<double> y0,
    double step,
    Func<Vector<double>, Vector<double>> f
  )
  {
    int passes = 0;
    const int MAGIC_NUMBER = 2048;
    var array = new Vector<double>[MAGIC_NUMBER];
    double current = 0;
    array[0] = y0;
    int length = 1;
    int loopStart = -1;
    while (length < MAGIC_NUMBER && passes < 2)
    {
      var vector = f(y0);
      Vector<double> vector2 = f(y0 + vector * step);
      var newY = y0 + step * 0.5 * (vector + vector2);
      array[length] = newY;
      if (y0[0] <= 0 && newY[0] > 0)
      {
        passes++;
        if (loopStart == -1)
        {
          loopStart = length - 1;
        }
      }
      current += step;
      y0 = newY;

      length++;
    }

    var points = array
      .Take(length - 1)
      .Select((y, i) => new OdePoint { Time = i * step, Value = y[0] })
      .ToArray();

    return new Solution { Points = points, LoopStart = loopStart };
  }
}

public class AnalyticSolver
{
  public static Solution Solve(Parameters parameters)
  {
    return new AnalyticSolver(parameters).SolveAnalytic();
  }

  private Solution SolveAnalytic()
  {
    Params.Duration = 2 * Math.PI / Omega;

    var timeStepInSeconds = Params.TimeStep / 1000;
    // var points = new ODEPoint[N]
    //   .Select(
    //     (_, i) =>
    //       new ODEPoint
    //       {
    //         Time = i * timeStepInSeconds,
    //         Value = PendulumApproxSolved(i * timeStepInSeconds)
    //       }
    //   )
    //   .ToArray();

    var points = new List<OdePoint>
    {
      new() { Time = 0, Value = PendulumApproxSolved(0) }
    };

    int passes = 0;
    int loopStart = -1;
    const int MAGIC_NUMBER = 2048;
    int length = 1;

    while (length < MAGIC_NUMBER && passes < 2)
    {
      var t = length * timeStepInSeconds;
      var y = PendulumApproxSolved(t);
      points.Add(new OdePoint { Time = t, Value = y });

      if (points[length - 1].Value <= 0 && points[length].Value > 0)
      {
        passes++;
        if (loopStart == -1)
        {
          loopStart = length - 1;
        }
      }

      length++;
    }

    return new Solution { Points = [.. points], LoopStart = loopStart };
  }

  private double PendulumApproxSolved(double t)
  {
    return Amplitude * Math.Sin(Omega * t + PhaseShift);
  }

  private Parameters Params { get; set; }

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

public record Solution
{
  public OdePoint[] Points { get; set; } = [];
  public int LoopStart { get; set; } = -1;
}

public record OdePoint()
{
  public double Time { get; init; }
  public double Value { get; init; }
}
