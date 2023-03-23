import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todos } from '../models/todos.models';

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todos!: Todos;
  @Output() removeTodo = new EventEmitter<string>();
  @Output() editTitleTodo = new EventEmitter<{
    todoId: string;
    title: string;
  }>();
  newTitle = '';
  isEditMode = false;
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
}
