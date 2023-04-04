import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomainType, FiltersType, Todos } from '../../../models/todos.models';
import { TodosService } from '../../../services/todos.service';
import { DomainTask } from '../../../models/tasks.models';

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todos!: DomainType;
  @Output() removeTodo = new EventEmitter<string>();
  @Output() editTitleTodo = new EventEmitter<{
    todoId: string;
    title: string;
  }>();
  newTitle = '';
  isEditMode = false;
  constructor(private todosService: TodosService) {}
  removeTodoHandler() {
    this.removeTodo.emit(this.todos.id);
  }
  activateEditModeHandler() {
    this.newTitle = this.todos.title;
    this.isEditMode = true;
  }
  editTitleHandler() {
    this.editTitleTodo.emit({ todoId: this.todos.id, title: this.newTitle });
    this.isEditMode = false;
  }

  changeFilter(filter: FiltersType) {
    this.todosService.changeFilter({ filter, todoId: this.todos.id });
  }
}
