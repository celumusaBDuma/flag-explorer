namespace FlagExplorer.Models
{
    public class CountryDetails
    {
        public required string Name { get; set; }
        public required string Capital { get; set; }
        public int Population { get; set; }
        public required string Flag { get; set; }
    }
}

/*

dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet tool uninstall -g dotnet-aspnet-codegenerator
dotnet tool install -g dotnet-aspnet-codegenerator
dotnet tool update -g dotnet-aspnet-codegenerator*/