import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { EditTaskGroup, TaskGroup } from '../models/task-group';
import { Observable } from 'rxjs';
import { apiURLs } from '../types/constants/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class TaskGroupService {

  constructor(private apiService:ApiService) { }

  getTaskGroups = (projectId: number): Observable<TaskGroup[]> => {
    return this.apiService.get(apiURLs.taskGroupWithId(projectId.toString()), {});
  };

  createTaskGroup = (taskGroup: EditTaskGroup): Observable<TaskGroup> => {
    return this.apiService.post(apiURLs.taskGroup, taskGroup, {});
  };

  updateTaskGroup = (taskGroup: EditTaskGroup): Observable<TaskGroup> => {
    return this.apiService.put(apiURLs.taskGroup, taskGroup, {});
  }

  deleteTaskGroup = (taskGroupId: number): Observable<void> => {
    return this.apiService.delete(apiURLs.taskGroupWithId(taskGroupId.toString()), {});
  }
}
