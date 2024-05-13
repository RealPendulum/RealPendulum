using RealPendulumApi;

static class EndpointData
{
  private const double _duration = 10;
  private const double _timeStep = 10;
  private const double _acceleration = 9.81;
  private const double _length = 1;
  private const double _initialAngle = 0;
  private const double _initialSpeed = 0.1;

  public static SolutionWithId SolvePendulumOde(
    double duration = _duration,
    double timeStep = _timeStep,
    double acceleration = _acceleration,
    double length = _length,
    double initialAngle = _initialAngle,
    double initialSpeed = _initialSpeed,
    bool isExact = true
  )
  {
    var solution = OdeSolver.Solve(
      new Parameters
      {
        Duration = duration,
        TimeStep = timeStep,
        Acceleration = acceleration,
        Length = length,
        InitialAngle = initialAngle,
        InitialLinearVelocity = initialSpeed,
        IsExact = isExact
      }
    );

    return new SolutionWithId
    {
      Id = Identificator.GenerateId("ode"),
      Solution = solution,
    };
  }

  public static SolutionWithId SolvePendulumAnalytic(
    double duration = _duration,
    double timeStep = _timeStep,
    double acceleration = _acceleration,
    double length = _length,
    double initialAngle = _initialAngle,
    double initialSpeed = _initialSpeed
  )
  {
    var solution = AnalyticSolver.Solve(
      new Parameters
      {
        Duration = duration,
        TimeStep = timeStep,
        Acceleration = acceleration,
        Length = length,
        InitialAngle = initialAngle,
        InitialLinearVelocity = initialSpeed,
        IsExact = false
      }
    );

    return new SolutionWithId
    {
      Id = Identificator.GenerateId("approx"),
      Solution = solution,
    };
  }

  public static SolutionWithId SolvePendulumRandom(
    double duration = _duration,
    double timeStep = _timeStep,
    double acceleration = _acceleration,
    double length = _length,
    double initialAngle = _initialAngle,
    double initialSpeed = _initialSpeed
  )
  {
    int random = new Random().Next(0, 2); // 1-true-ode   0-false-approx
    var solution = RandomSolver.Solve(
      new Parameters
      {
        Duration = duration,
        TimeStep = timeStep,
        Acceleration = acceleration,
        Length = length,
        InitialAngle = initialAngle,
        InitialLinearVelocity = initialSpeed,
        IsExact = random == 1
      }
    );

    var solutionType = random == 1 ? "ode" : "approx";

    return new SolutionWithId
    {
      Id = Identificator.GenerateId(solutionType),
      Solution = solution,
    };
  }

  public static bool CheckAnswer(
    string id,
    string solutionType = "ode",
    string answer = "ode"
  )
  {
    return Identificator.IsCorrectAnswer(id, answer);
  }
}

record SolutionWithId
{
  public required string Id { get; set; }
  public required Solution Solution { get; set; }
}
