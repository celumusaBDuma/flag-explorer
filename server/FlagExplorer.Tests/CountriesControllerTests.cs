using Xunit;
using Moq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FlagExplorer.Controllers;
using FlagExplorer.Models;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using FlagExplorer;


namespace FlagExplorer.Tests
{

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

}