import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Country {
  name: string;
  flag: string;
}

export interface CountryDetails {
  name: string;
  capital: string;
  population: number;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'http://localhost:5000/countries';
  
  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }

  getCountryDetails(name: string): Observable<CountryDetails> {
    return this.http.get<CountryDetails>(`${this.apiUrl}/${name}`);
  }
}
