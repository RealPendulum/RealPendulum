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
      double initialAngle = 0.1,
      double initialSpeed = 0.0,
      bool isExact = true
    ) =>
    {
      var points = new ODESolver
      {
        Params = new Parameters
        {
          Duration = duration,
          TimeStep = timeStep,
          Acceleration = acceleration,
          Length = length,
          InitialAngle = initialAngle,
          InitialSpeed = initialSpeed,
          IsExact = isExact
        }
      }.Solve();
      return points.ToODEPoints();
    }
  )
  .WithName("GetPendulumSolution")
  .WithOpenApi();

app.MapGet(
  "/pendulum/approx",
  (
    double duration = 10,
    double timeStep = 10,
    double acceleration = 9.81,
    double length = 1,
    double initialAngle = 0.1,
    double initialSpeed = 0.0
  ) =>
  {
    var points = new ApproxSolver
    {
      Params =
      {
        Duration = duration,
        TimeStep = timeStep,
        Acceleration = acceleration,
        Length = length,
        InitialAngle = initialAngle,
        InitialSpeed = initialSpeed
      }
    }.Solve();

    return points.ToODEPoints();
  }
);

app.UseCors("AllowAnyOrigin");

app.Run();
