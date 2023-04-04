import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FiltersType } from '../../../models/todos.models';

@Component({
  selector: 'tl-filters-botton',
  templateUrl: './filters-botton.component.html',
  styleUrls: ['./filters-botton.component.scss'],
})
export class FiltersBottonComponent {
  @Input() filter!: FiltersType;
  @Output() changeFilterEvent = new EventEmitter<FiltersType>();
  changeFilterHandler(filter: FiltersType) {
    this.changeFilterEvent.emit(filter);
  }
}
