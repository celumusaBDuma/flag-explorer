import { Component } from '@angular/core';
import { CountryItemComponent } from './country-item/country-item.component';
import { CommonModule } from '@angular/common';
import { Country, CountryService } from '../services/country.service';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Component({
  selector: 'app-countries-list',
  imports: [CountryItemComponent, CommonModule, SpinnerComponent],
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.css',
})
export class CountriesListComponent {
  countries: Country[] = [];
  paginatedCountries: Country[] = [];
  currentPage  = 1;
  pageSize = 12;
  isLoading = true;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(data => {
      this.countries = data;
      this.updatePagination();
      this.isLoading = false;
    });
  }

    updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCountries = this.countries.slice(start, end);
  }

  nextPage(): void {
    if ((this.currentPage * this.pageSize) < this.countries.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.countries.length / this.pageSize) }, (_, i) => i + 1);
  }
}
