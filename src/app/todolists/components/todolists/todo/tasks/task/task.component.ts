import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/todolists/models/tasks.models';
import { TasksService } from '../../../../../services/tasks.service';

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() removeTaskEvent = new EventEmitter<{
    todolistId: string;
    taskId: string;
  }>();

  deleteTaskHandler() {
    this.removeTaskEvent.emit({
      todolistId: this.task.todoListId,
      taskId: this.task.id,
    });
  }
}
