static class Identificator
{
  static Dictionary<string, GameRecord> solutionsWithId =
    new Dictionary<string, GameRecord>();

  public static string GenerateId(string solutionType)
  {
    string id = Guid.NewGuid().ToString().Substring(0, 16);
    while (solutionsWithId.ContainsKey(id))
    {
      id = Guid.NewGuid().ToString().Substring(0, 16);
    }
    solutionsWithId.Add(id, new GameRecord { SolutionType = solutionType });
    return id;
  }

  public static bool IsCorrectAnswer(string id, string answer)
  {
    var solution = solutionsWithId[id];

    solution.Answer = answer;
    return solution.SolutionType == answer;
  }

  public static bool IsValidAnswer(string id, string answer)
  {
    if (!solutionsWithId.TryGetValue(id, out GameRecord? value))
    {
      return false;
    }

    if (value.Answer != null)
    {
      return false;
    }

    return answer == "ode" || answer == "approx";
  }

  public static double CalculateStats()
  {
    double correct = 0;
    double total = 0;
    foreach (var solution in solutionsWithId.Values)
    {
      if (solution.Answer != null)
      {
        total++;
        if (solution.SolutionType == solution.Answer)
        {
          correct++;
        }
      }
    }
    return correct / total;
  }
}

record GameRecord
{
  public required string SolutionType { get; set; }
  public string? Answer { get; set; }
}
