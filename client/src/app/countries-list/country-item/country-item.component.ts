import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-country-item',
  imports: [],
  templateUrl: './country-item.component.html',
  styleUrl: './country-item.component.css'
})
export class CountryItemComponent {
  @Input() country: any;
}
