using RealPendulumApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
  options.AddPolicy(
    "AllowAnyOrigin",
    builder =>
    {
      builder.AllowAnyOrigin();
      builder.AllowAnyMethod();
      builder.AllowAnyHeader();
    }
  );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet(
    "/pendulum/ode",
    (
      double duration = 10.0,
      double timeStep = 10.0,
      double acceleration = 9.81,
      double length = 1.0,
      double initialAngle = 0,
      double initialSpeed = 0.1,
      bool isExact = true
    ) =>
    {
      var solution = OdeSolver.Solve(
        new Parameters
        {
          Duration = duration,
          TimeStep = timeStep,
          Acceleration = acceleration,
          Length = length,
          InitialAngle = initialAngle,
          InitialSpeed = initialSpeed,
          IsExact = isExact
        }
      );

      return solution;
    }
  )
  .WithName("Exact Pendulum Solution")
  .WithOpenApi();

app.MapGet(
    "/pendulum/approx",
    (
      double duration = 10,
      double timeStep = 10,
      double acceleration = 9.81,
      double length = 1,
      double initialAngle = 0,
      double initialSpeed = 0.1
    ) =>
    {
      var solution = AnalyticSolver.Solve(
        new Parameters
        {
          Duration = duration,
          TimeStep = timeStep,
          Acceleration = acceleration,
          Length = length,
          InitialAngle = initialAngle,
          InitialSpeed = initialSpeed,
          IsExact = false
        }
      );

      return solution;
    }
  )
  .WithName("Approximate Pendulum Solution")
  .WithOpenApi();

app.MapGet(
    "/pendulum/random",
    (
      double duration = 10,
      double timeStep = 10,
      double acceleration = 9.81,
      double length = 1,
      double initialAngle = 0,
      double initialSpeed = 0.1
    ) =>
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
          InitialSpeed = initialSpeed,
          IsExact = random == 1
        }
      );

      return solution;
    }
  )
  .WithName("Random Method Pendulum Solution")
  .WithOpenApi();

app.UseCors("AllowAnyOrigin");

app.Run();
