export interface EditTaskModel{
  id?: number;
  taskGroupId?: number;
  name: string;
  description: string;
  priority: TaskPriority;
  startDate: string | null;
  endDate: string | null;
}

export interface TaskModel{
  id: number;
  taskGroupId: number;
  name: string;
  description: string;
  priority: TaskPriority;
  isCompleted: boolean;
  startDate: string;
  endDate: string | null;
}

export interface UpdateTaskState{
  isCompleted: boolean;
}

export enum TaskPriority{
  Unknown = 1,
  Low = 2,
  Average = 3,
  High = 4
}
