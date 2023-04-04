import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';
import { combineLatest, combineLatestAll, map, Observable } from 'rxjs';
import { Task, UpdateStatusTask } from 'src/app/todolists/models/tasks.models';
import { TodosService } from '../../../../services/todos.service';
import { TaskStatusEnum } from '../../../../../core/enums/tasks.enum';

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todolistId!: string;
  tasks$?: Observable<Task[]>;
  taskTitle = '';
  constructor(
    private tasksService: TasksService,
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.todosService.todos$;
    this.tasks$ = combineLatest([
      this.tasksService.tasks$,
      this.todosService.todos$,
    ]).pipe(
      map((res) => {
        const tasks = res[0];
        let tasksForTodo = tasks[this.todolistId];
        const activeTodo = res[1].find((tl) => tl.id === this.todolistId);
        if (activeTodo?.filter === 'completed') {
          tasksForTodo = tasksForTodo.filter(
            (t) => t.status === TaskStatusEnum.completed
          );
        }
        if (activeTodo?.filter === 'active') {
          tasksForTodo = tasksForTodo.filter(
            (t) => t.status === TaskStatusEnum.active
          );
        }
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

  removeTask(data: { todolistId: string; taskId: string }) {
    this.tasksService.deleteTask(data);
  }

  changeTask(data: {
    todolistId: string;
    taskId: string;
    model: UpdateStatusTask;
  }) {
    this.tasksService.updateTask(data);
  }
}
