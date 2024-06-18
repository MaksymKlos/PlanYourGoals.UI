import { TaskModel } from "./task-model";

export interface EditTaskGroup{
  id?: number;
  projectId?: number;
  name: string;
  description: string;
}

export interface TaskGroup {
  id: number;
  projectId: number;
  name: string;
  description: string;
  tasks: TaskModel[];
}