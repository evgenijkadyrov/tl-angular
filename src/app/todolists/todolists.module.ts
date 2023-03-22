import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos/todos.component';
import { TodosRoutingModule } from './todos-routing.module';

@NgModule({
  declarations: [TodosComponent],
  imports: [CommonModule, TodosRoutingModule],
})
export class TodolistsModule {}