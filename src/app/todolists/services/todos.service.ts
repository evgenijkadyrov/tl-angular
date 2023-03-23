import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { Todos } from '../models/todos.models';
import { CommonResponse } from '../../core/models/commonResponse.models';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$: BehaviorSubject<Todos[]> = new BehaviorSubject<Todos[]>([]);
  constructor(private http: HttpClient) {}
  getTodos() {
    this.http
      .get<Todos[]>(`${environment.baseUrl}/todo-lists`)
      .subscribe((todos) => {
        this.todos$.next(todos);
      });
  }
  addNewTodo(title: string) {
    this.http
      .post<CommonResponse<{ item: Todos }>>(
        `${environment.baseUrl}/todo-lists`,
        { title }
      )
      .pipe(
        map((res) => {
          const state = this.todos$.getValue();
          const newTodo = res.data.item;
          return [newTodo, ...state];
        })
      )
      .subscribe((todos) => {
        this.todos$.next(todos);
      });
  }

  removeTodo(todoId: string) {
    this.http
      .delete(`${environment.baseUrl}/todo-lists/${todoId}`)
      .pipe(
        map((res) => {
          const state = this.todos$.getValue();
          return state.filter((el) => el.id !== todoId);
        })
      )
      .subscribe((todos) => {
        this.todos$.next(todos);
      });
  }

  updateTitle(data: { todoId: string; title: string }) {
    this.http
      .put<CommonResponse>(`${environment.baseUrl}/todo-lists/${data.todoId}`, {
        title: data.title,
      })
      .pipe(
        map(() => {
          const state = this.todos$.getValue();
          return state.map((el) => {
            if (el.id === data.todoId) {
              return { ...el, title: data.title };
            } else {
              return el;
            }
          });
        })
      )
      .subscribe((todos) => {
        this.todos$.next(todos);
      });
  }
}
