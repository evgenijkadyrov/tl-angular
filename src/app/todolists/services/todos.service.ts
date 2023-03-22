import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Todos } from '../models/todos.models';

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
}
