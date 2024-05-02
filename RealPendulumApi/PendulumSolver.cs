using MathNet.Numerics.LinearAlgebra;

namespace RealPendulumApi;

public class OdeSolver
{
  public static Solution Solve(Parameters parameters)
  {
    if (Validator.IsTrivial(parameters))
    {
      return Validator.GetTrivialSolution();
    }
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
  /// Taken from MathNet.Numerics.OdeSolvers.RungeKutta.
  /// </summary>
  public static Solution SecondOrder(
    Vector<double> y0,
    double step,
    Func<Vector<double>, Vector<double>> f
  )
  {
    int leftToRightPasses = 0;
    int loopStart = -1;
    const int MAGIC_NUMBER = 2048;
    var array = new Vector<double>[MAGIC_NUMBER];
    double current = 0;
    array[0] = y0;
    int length = 1;
    while (length < MAGIC_NUMBER && leftToRightPasses < 2)
    {
      var vector = f(y0);
      Vector<double> vector2 = f(y0 + vector * step);
      var newY = y0 + step * 0.5 * (vector + vector2);
      newY[0] = MathUtils.ReduceAngle(newY[0]);
      array[length] = newY;
      var prev = y0[0];
      var next = newY[0];
      if (prev <= 0 && next > 0)
      {
        leftToRightPasses++;
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
      .Select((y, i) => new Location { Time = i * step, Value = y[0] })
      .ToArray();

    return new Solution { Points = points, LoopStart = loopStart };
  }
}

public class AnalyticSolver
{
  public static Solution Solve(Parameters parameters)
  {
    if (Validator.IsTrivial(parameters))
    {
      return Validator.GetTrivialSolution();
    }
    return new AnalyticSolver(parameters).SolveAnalytic();
  }

  private Solution SolveAnalytic()
  {
    Params.Duration = 2 * Math.PI / Omega;

    var timeStepInSeconds = Params.TimeStep / 1000;

    var points = new List<Location>
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
      points.Add(new Location { Time = t, Value = y });

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

public class RandomSolver
{
  public static Solution Solve(Parameters parameters)
  {
    if (parameters.IsExact)
    {
      return OdeSolver.Solve(parameters);
    }
    else
    {
      return AnalyticSolver.Solve(parameters);
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

public class Validator
{
  private static readonly double _angleEpsilon = 1e-6;
  private static readonly double _speedEpsilon = 1e-6;

  public static bool IsTrivial(Parameters parameters)
  {
    return Math.Abs(parameters.InitialSpeed) < _speedEpsilon
      && Math.Abs(MathUtils.ReduceAngle(parameters.InitialAngle))
        < _angleEpsilon;
  }

  public static Solution GetTrivialSolution()
  {
    return new Solution
    {
      Points = [new Location { Time = 0, Value = 0 }],
      LoopStart = 0
    };
  }
}

public class MathUtils
{
  public static double ReduceAngle(double angle)
  {
    while (angle <= -Math.PI)
    {
      angle += 2 * Math.PI;
    }
    while (angle > Math.PI)
    {
      angle -= 2 * Math.PI;
    }
    return angle;
  }
}

public record Solution
{
  public int LoopStart { get; set; } = -1;
  public Location[] Points { get; set; } = [];
}

public record Location
{
  public double Time { get; init; }
  public double Value { get; init; }
}
