import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { EditTaskModel, TaskModel, UpdateTaskState } from '../models/task-model';
import { apiURLs } from '../types/constants/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService:ApiService) { }

  getTasks = (groupId: number): Observable<TaskModel[]> => {
    return this.apiService.get(apiURLs.taskWithId(groupId.toString()), {});
  }

  getUserTasks = ():Observable<TaskModel[]> => {
    return this.apiService.get(apiURLs.task, {});
  }

  createTask = (task: EditTaskModel): Observable<TaskModel> => {
    return this.apiService.post(apiURLs.task, task, {});
  }

  updateTask = (task: EditTaskModel): Observable<TaskModel> => {
    return this.apiService.put(apiURLs.task, task, {});
  }

  updateTaskState = (taskId: number, taskState: UpdateTaskState): Observable<void> => {
    return this.apiService.patch(apiURLs.taskWithId(taskId.toString()), taskState, {})
  }

  deleteTask = (taskId: number): Observable<void> => {
    return this.apiService.delete(apiURLs.taskWithId(taskId.toString()), {});
  }
}
