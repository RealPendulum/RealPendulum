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

app.MapGet("/pendulum/ode", EndpointData.SolvePendulumOde)
  .WithName("Exact Pendulum Solution")
  .WithOpenApi();

app.MapGet("/pendulum/approx", EndpointData.SolvePendulumAnalytic)
  .WithName("Approximate Pendulum Solution")
  .WithOpenApi();

app.MapGet("/pendulum/random", EndpointData.SolvePendulumRandom)
  .WithName("Random Method Pendulum Solution")
  .WithOpenApi();

app.MapGet("/result", EndpointData.CheckAnswer)
  .WithName("Check Player Answer Correctness")
  .WithOpenApi();

app.MapGet("/stats", EndpointData.GetStats)
  .WithName("Get Game Statistics")
  .WithOpenApi();

app.MapGet("/easy", EndpointData.Easy)
  .WithName("Easy Difficulty")
  .WithOpenApi();

app.MapGet("/medium", EndpointData.Medium)
  .WithName("Medium Difficulty")
  .WithOpenApi();

app.MapGet("/hard", EndpointData.Hard)
  .WithName("Hard Difficulty")
  .WithOpenApi();

app.UseCors("AllowAnyOrigin");

app.Run();
