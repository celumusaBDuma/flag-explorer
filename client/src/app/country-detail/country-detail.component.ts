import { Component } from '@angular/core';
import { CountryDetails, CountryService } from '../services/country.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../shared/spinner/spinner.component';


@Component({
  selector: 'app-country-detail',
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css'
})
export class CountryDetailComponent {
  countryDetails: CountryDetails | null = null;
  isLoading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.countryService.getCountryDetails(name).subscribe({
        next: (data) => {
          this.countryDetails = data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
