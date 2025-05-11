using System.Net.Http;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using FlagExplorer;
using System.Text.Json;
using System.Collections.Generic;
using FlagExplorer.Models;

public class CountriesControllerIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public CountriesControllerIntegrationTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetAllCountries_ReturnsSuccessAndNonEmptyList()
    {
        var response = await _client.GetAsync("/Countries");

        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        var countries = JsonSerializer.Deserialize<List<Country>>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        Assert.NotNull(countries);
        Assert.NotEmpty(countries);
    }

    [Fact]
    public async Task GetCountryByName_ReturnsDetails_WhenCountryExists()
    {
        var response = await _client.GetAsync("/Countries/South%20Africa");

        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        var country = JsonSerializer.Deserialize<CountryDetails>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        Assert.NotNull(country);
        Assert.Equal("South Africa", country.Name);
    }
}
