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

  public static IResult CheckAnswer(string id, string answer)
  {
    if (!Identificator.IsValidAnswer(id, answer))
    {
      return Results.BadRequest("Invalid answer format");
    }

    bool isCorrect = Identificator.IsCorrectAnswer(id, answer);

    if (isCorrect)
    {
      return Results.Ok();
    }
    else
    {
      return Results.Ok(new { message = "Incorrect answer" });
    }
  }

  public static double GetStats(Difficulty difficulty)
  {
    return Identificator.CalculateStats(difficulty);
  }

  public static TwoSolutions Easy(double timeStep = _timeStep)
  {
    double duration = _duration;
    double acceleration = _acceleration;
    double length = _length;
    double initialAngle = 1.5;
    double initialSpeed = _initialSpeed;

    var solutionOde = OdeSolver.Solve(
      new Parameters
      {
        Duration = duration,
        TimeStep = timeStep,
        Acceleration = acceleration,
        Length = length,
        InitialAngle = initialAngle,
        InitialLinearVelocity = initialSpeed,
        IsExact = true
      }
    );

    var solutionAnalytic = AnalyticSolver.Solve(
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

    var Solution1 = new SolutionWithId
    {
      Id = Identificator.GenerateId("ode", Difficulty.Easy),
      Solution = solutionOde,
    };
    var Solution2 = new SolutionWithId
    {
      Id = Identificator.GenerateId("approx", Difficulty.Easy),
      Solution = solutionAnalytic,
    };

    var random = new Random();
    var rand = random.Next(0, 2);
    return (
      new TwoSolutions
      {
        Solution1 = rand == 0 ? Solution1 : Solution2,
        Solution2 = rand == 0 ? Solution2 : Solution1
      }
    );
  }

  public static TwoSolutions Medium(double timeStep = _timeStep)
  {
    double duration = _duration;
    double acceleration = _acceleration;
    double length = _length;
    double initialAngle = 1;
    double initialSpeed = _initialSpeed;

    var solutionOde = OdeSolver.Solve(
      new Parameters
      {
        Duration = duration,
        TimeStep = timeStep,
        Acceleration = acceleration,
        Length = length,
        InitialAngle = initialAngle,
        InitialLinearVelocity = initialSpeed,
        IsExact = true
      }
    );

    var solutionAnalytic = AnalyticSolver.Solve(
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

    var Solution1 = new SolutionWithId
    {
      Id = Identificator.GenerateId("ode", Difficulty.Medium),
      Solution = solutionOde,
    };
    var Solution2 = new SolutionWithId
    {
      Id = Identificator.GenerateId("approx", Difficulty.Medium),
      Solution = solutionAnalytic,
    };

    var random = new Random();
    var rand = random.Next(0, 2);
    return (
      new TwoSolutions
      {
        Solution1 = rand == 0 ? Solution1 : Solution2,
        Solution2 = rand == 0 ? Solution2 : Solution1
      }
    );
  }

  public static TwoSolutions Hard(double timeStep = _timeStep)
  {
    double duration = _duration;
    double acceleration = _acceleration;
    double length = _length;
    double initialAngle = 0.5;
    double initialSpeed = _initialSpeed;

    var solutionOde = OdeSolver.Solve(
      new Parameters
      {
        Duration = duration,
        TimeStep = timeStep,
        Acceleration = acceleration,
        Length = length,
        InitialAngle = initialAngle,
        InitialLinearVelocity = initialSpeed,
        IsExact = true
      }
    );

    var solutionAnalytic = AnalyticSolver.Solve(
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

    var Solution1 = new SolutionWithId
    {
      Id = Identificator.GenerateId("ode", Difficulty.Hard),
      Solution = solutionOde,
    };
    var Solution2 = new SolutionWithId
    {
      Id = Identificator.GenerateId("approx", Difficulty.Hard),
      Solution = solutionAnalytic,
    };

    var random = new Random();
    var rand = random.Next(0, 2);
    return (
      new TwoSolutions
      {
        Solution1 = rand == 0 ? Solution1 : Solution2,
        Solution2 = rand == 0 ? Solution2 : Solution1
      }
    );
  }
}

record SolutionWithId
{
  public required string Id { get; set; }
  public required Solution Solution { get; set; }
}

record TwoSolutions
{
  public required SolutionWithId Solution1 { get; set; }
  public required SolutionWithId Solution2 { get; set; }
}
