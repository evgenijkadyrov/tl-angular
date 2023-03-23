import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todos } from '../../models/todos.models';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos$!: Observable<Todos[]>;
  todoTitle = '';
  addTodoHandler() {
    this.todosService.addNewTodo(this.todoTitle);
    this.todoTitle = '';
  }
  constructor(private todosService: TodosService) {}
  ngOnInit() {
    this.todos$ = this.todosService.todos$;
    this.todosService.getTodos();
  }

  removeTodo(todoId: string) {
    this.todosService.removeTodo(todoId);
  }

  editTitleTodo(data: { todoId: string; title: string }) {
    this.todosService.updateTitle(data);
  }
}
