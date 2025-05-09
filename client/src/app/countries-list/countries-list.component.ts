import { Component } from '@angular/core';
import { CountryItemComponent } from './country-item/country-item.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-countries-list',
  imports: [CountryItemComponent, CommonModule],
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.css',
})
export class CountriesListComponent {
  countries: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('assets/data/countries_data.json')
      .subscribe((response) => {
        this.countries = response;
      });
  }
}
