import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './components/todolists/todos.component';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosService } from './services/todos.service';
import { TodoComponent } from './components/todolists/todo/todo.component';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './components/todolists/todo/tasks/tasks.component';
import { TaskComponent } from './components/todolists/todo/tasks/task/task.component';
import { FiltersFooterComponent } from './components/todolists/filters-footer/filters-footer.component';
import { FiltersBottonComponent } from './components/todolists/filters-botton/filters-botton.component';

@NgModule({
  declarations: [TodosComponent, TodoComponent, TasksComponent, TaskComponent, FiltersFooterComponent, FiltersBottonComponent],
  imports: [CommonModule, TodosRoutingModule, FormsModule],
})
export class TodolistsModule {
  constructor(private todosService: TodosService) {}
}
