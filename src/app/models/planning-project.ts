import { TaskGroup } from "./task-group";

export interface EditPlanningProject {
  id?: number;
  name: string;
}

export interface PlanningProject{
  id: number;
  userId: number;
  name: string;
  taskGroups: TaskGroup[];
}