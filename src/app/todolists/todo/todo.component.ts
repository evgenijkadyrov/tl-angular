import { Component, Input } from '@angular/core';
import { Todos } from '../models/todos.models';

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todos!: Todos;
}
