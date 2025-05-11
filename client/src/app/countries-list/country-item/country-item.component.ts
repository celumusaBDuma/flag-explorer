import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-country-item',
  imports: [RouterModule],
  templateUrl: './country-item.component.html',
  styleUrl: './country-item.component.css'
})
export class CountryItemComponent {
  @Input() country: any;
}
