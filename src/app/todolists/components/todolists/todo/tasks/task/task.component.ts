import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, UpdateStatusTask } from 'src/app/todolists/models/tasks.models';
import { TaskStatusEnum } from '../../../../../../core/enums/tasks.enum';

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
  @Output() changeTaskEvent = new EventEmitter<{
    todolistId: string;
    taskId: string;
    model: UpdateStatusTask;
  }>();
  taskStatusEnum = TaskStatusEnum;

  deleteTaskHandler() {
    this.removeTaskEvent.emit({
      todolistId: this.task.todoListId,
      taskId: this.task.id,
    });
  }

  changeTaskStatusHandler(data: MouseEvent) {
    const newStatus = (data.currentTarget as HTMLInputElement).checked;
    const model: UpdateStatusTask = {
      status: newStatus ? TaskStatusEnum.completed : TaskStatusEnum.active,
      title: this.task.title,
      completed: this.task.completed,
      deadline: this.task.deadline,
      description: this.task.description,
      priority: this.task.priority,
      startDate: this.task.startDate,
    };
    this.changeTaskEvent.emit({
      todolistId: this.task.todoListId,
      taskId: this.task.id,
      model: model,
    });
  }
}
