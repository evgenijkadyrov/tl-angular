import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  Tasks,
  Task,
  DomainTask,
  UpdateStatusTask,
} from '../models/tasks.models';
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
  deleteTask(data: { todolistId: string; taskId: string }) {
    this.http
      .delete<CommonResponse>(
        `${environment.baseUrl}/todo-lists/${data.todolistId}/tasks/${data.taskId}`
      )
      .pipe(
        map((res) => {
          const stateTasks = this.tasks$.getValue();
          const tasksForTodo = stateTasks[data.todolistId];
          const filtredTasks = tasksForTodo.filter(
            (task) => task.id !== data.taskId
          );
          stateTasks[data.todolistId] = filtredTasks;
          return stateTasks;
        })
      )
      .subscribe((tasks) => {
        this.tasks$.next(tasks);
      });
  }
  updateTask(data: {
    todolistId: string;
    taskId: string;
    model: UpdateStatusTask;
  }) {
    this.http
      .put<CommonResponse>(
        `${environment.baseUrl}/todo-lists/${data.todolistId}/tasks/${data.taskId}`,
        data.model
      )
      .pipe(
        map((res) => {
          const stateTasks = this.tasks$.getValue();
          const tasksForTodo = stateTasks[data.todolistId];
          const newTasks = tasksForTodo.map((task) => {
            if (task.id === data.taskId) {
              return { ...task, ...data.model };
            } else {
              return task;
            }
          });
          stateTasks[data.todolistId] = newTasks;
          return stateTasks;
        })
      )
      .subscribe((tasks) => {
        this.tasks$.next(tasks);
      });
  }
}
