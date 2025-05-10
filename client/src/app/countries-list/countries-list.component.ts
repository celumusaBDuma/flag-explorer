import { Component } from '@angular/core';
import { CountryItemComponent } from './country-item/country-item.component';
import { CommonModule } from '@angular/common';
import { Country, CountryService } from '../services/country.service';

@Component({
  selector: 'app-countries-list',
  imports: [CountryItemComponent, CommonModule],
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.css',
})
export class CountriesListComponent {
  countries: Country[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(data => {
      this.countries = data;
    });
  }
}
