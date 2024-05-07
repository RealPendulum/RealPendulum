static class Identificator
{
  static Dictionary<string, string> solutionsWithId =
    new Dictionary<string, string>();

  public static string GenerateId(string solutionType)
  {
    string id = Guid.NewGuid().ToString().Substring(0, 16);
    while (solutionsWithId.ContainsKey(id))
    {
      id = Guid.NewGuid().ToString().Substring(0, 16);
    }
    solutionsWithId.Add(id, solutionType);
    return id;
  }
}
