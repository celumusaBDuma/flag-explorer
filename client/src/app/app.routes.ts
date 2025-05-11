import { Routes } from '@angular/router';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/country', pathMatch: 'full'},
  { path: 'country', component: CountriesListComponent },
  { path: 'country/:name', component: CountryDetailComponent }
];