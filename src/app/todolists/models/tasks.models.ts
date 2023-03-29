export interface Tasks {
  items: Task[];
  totalCount: number;
  error: string;
}
export interface Task extends UpdateStatusTask {
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
}
export interface UpdateStatusTask {
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
}
export interface DomainTask {
  [key: string]: Task[];
}
