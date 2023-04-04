import { Component, Input } from '@angular/core';

@Component({
  selector: 'tl-filters-footer',
  templateUrl: './filters-footer.component.html',
  styleUrls: ['./filters-footer.component.scss'],
})
export class FiltersFooterComponent {
  @Input() addedDate!: string;
}
