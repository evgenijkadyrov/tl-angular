import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosService } from './services/todos.service';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [TodosComponent, TodoComponent],
  imports: [CommonModule, TodosRoutingModule],
})
export class TodolistsModule {
  constructor(private todosService: TodosService) {}
}
