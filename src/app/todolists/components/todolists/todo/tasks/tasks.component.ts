import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';
import { map, Observable } from 'rxjs';
import { Task } from 'src/app/todolists/models/tasks.models';

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todolistId!: string;
  tasks$?: Observable<Task[]>;
  taskTitle = '';
  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks$ = this.tasksService.tasks$.pipe(
      map((tasks) => {
        const tasksForTodo = tasks[this.todolistId];
        return tasksForTodo;
      })
    );
    this.tasksService.getTasks(this.todolistId);
  }
  addTaskHandler() {
    this.tasksService.addTasks({
      todolistId: this.todolistId,
      title: this.taskTitle,
    });
    this.taskTitle = '';
  }
}
