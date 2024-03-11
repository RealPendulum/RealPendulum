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

var summaries = new[]
{
    "Freezing",
    "Bracing",
    "Chilly",
    "Cool",
    "Mild",
    "Warm",
    "Balmy",
    "Hot",
    "Sweltering",
    "Scorching"
};

app.MapGet(
        "/weatherforecast",
        () =>
        {
            var forecast = Enumerable
                .Range(1, 5)
                .Select(index => new WeatherForecast(
                    DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    Random.Shared.Next(-20, 55),
                    summaries[Random.Shared.Next(summaries.Length)]
                ))
                .ToArray();
            return forecast;
        }
    )
    .WithName("GetWeatherForecast")
    .WithOpenApi();

app.MapGet(
        "/realode",
        () =>
        {
            var points = MathNetExample.SolveRealODE(20, 10);
            return points.Select((y, i) => new ODEPoint { Time = i / 100.0, Value = y }).ToArray();
        }
    )
    .WithName("SolveRealODE")
    .WithOpenApi();

app.MapGet(
        "/fakeode",
        () =>
        {
            var points = MathNetExample.SolveFakeODE(20, 10);
            return points.Select((y, i) => new ODEPoint { Time = i / 100.0, Value = y }).ToArray();
        }
    )
    .WithName("SolveFakeODE")
    .WithOpenApi();

app.UseCors("AllowAnyOrigin");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

record ODEPoint()
{
    public double Time { get; init; }
    public double Value { get; init; }
}
