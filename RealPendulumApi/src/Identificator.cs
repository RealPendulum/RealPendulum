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
    if (solutionsWithId.ContainsKey(id))
    {
      var solution = solutionsWithId[id];
      solution.Answer = answer;
      if (solution.SolutionType == answer)
      {
        return true;
      }
    }
    return false;
  }
}

record GameRecord
{
  public required string SolutionType { get; set; }
  public string? Answer { get; set; }
}
