using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;
using FlagExplorer.Models;

namespace FlagExplorer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountriesController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public CountriesController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> GetAllCountries()
        {
            var response = await _httpClient.GetAsync("https://restcountries.com/v3.1/all");
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch countries.");
            }

            var json = await response.Content.ReadAsStringAsync();

            var countries = new List<Country>();

            using (var doc = JsonDocument.Parse(json))
            {
                foreach (var c in doc.RootElement.EnumerateArray())
                {
                    var name = c.GetProperty("name").GetProperty("common").GetString();
                    var flag = c.GetProperty("flags").GetProperty("png").GetString();

                    countries.Add(new Country
                    {
                        Name = name!,
                        Flag = flag!
                    });
                }
            }

            return Ok(countries);
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<CountryDetails>> GetCountryByName(string name)
        {
            var response = await _httpClient.GetAsync($"https://restcountries.com/v3.1/name/{name}");

            if (!response.IsSuccessStatusCode)
            {
                return NotFound($"Country '{name}' not found.");
            }

            var json = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(json);
            var countryData = doc.RootElement[0];

            var countryDetails = new CountryDetails
            {
                Name = countryData.GetProperty("name").GetProperty("common").GetString()!,
                Flag = countryData.GetProperty("flags").GetProperty("png").GetString()!,
                Population = countryData.GetProperty("population").GetInt32(),
                Capital = countryData.TryGetProperty("capital", out var capitalElem) && capitalElem.GetArrayLength() > 0
                          ? capitalElem[0].GetString()!
                          : "N/A"
            };

            return Ok(countryDetails);
        }
    }
}
