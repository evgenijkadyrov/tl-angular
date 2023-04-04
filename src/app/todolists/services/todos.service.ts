import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { DomainType, FiltersType, Todos } from '../models/todos.models';
import { CommonResponse } from '../../core/models/commonResponse.models';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$: BehaviorSubject<DomainType[]> = new BehaviorSubject<DomainType[]>([]);
  constructor(private http: HttpClient) {}
  getTodos() {
    this.http
      .get<Todos[]>(`${environment.baseUrl}/todo-lists`)
      .pipe(
        map((todos) => {
          const newTodos: DomainType[] = todos.map((tl) => ({
            ...tl,
            filter: 'all',
          }));
          return newTodos;
        })
      )
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
          const newTodo: DomainType = { ...res.data.item, filter: 'all' };
          return [newTodo, ...state];
        })
      )
      .subscribe((todos) => {
        debugger;
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

  changeFilter(data: { filter: FiltersType; todoId: string }) {
    const state = this.todos$.getValue();
    const newState = state.map((tl) => {
      if (tl.id === data.todoId) {
        return { ...tl, filter: data.filter };
      } else {
        return tl;
      }
    });
    this.todos$.next(newState);
    console.log(this.todos$.getValue());
  }
}
