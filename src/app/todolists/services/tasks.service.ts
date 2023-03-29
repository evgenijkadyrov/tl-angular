import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tasks, Task, DomainTask } from '../models/tasks.models';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CommonResponse } from '../../core/models/commonResponse.models';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$ = new BehaviorSubject<DomainTask>({});
  constructor(private http: HttpClient) {}
  getTasks(todolistId: string) {
    return this.http
      .get<Tasks>(`${environment.baseUrl}/todo-lists/${todolistId}/tasks`)
      .pipe(map((res) => res.items))
      .subscribe((tasks: Task[]) => {
        const stateTasks = this.tasks$.getValue();
        stateTasks[todolistId] = tasks;
        this.tasks$.next(stateTasks);
      });
  }
  addTasks(data: { todolistId: string; title: string }) {
    this.http
      .post<CommonResponse<{ item: Task }>>(
        `${environment.baseUrl}/todo-lists/${data.todolistId}/tasks`,
        {
          title: data.title,
        }
      )
      .pipe(
        map((res) => {
          const stateTasks = this.tasks$.getValue();
          const newTask = res.data.item;
          const newTasks = [newTask, ...stateTasks[data.todolistId]];
          stateTasks[data.todolistId] = newTasks;
          return stateTasks;
        })
      )
      .subscribe((tasks: DomainTask) => {
        this.tasks$.next(tasks);
      });
  }
}
