import { Injectable } from '@angular/core';
import { EditPlanningProject, PlanningProject } from '../models/planning-project';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { apiURLs } from '../types/constants/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class PlanningProjectService {
  constructor(private apiService:ApiService) { }

  getProjects = (): Observable<PlanningProject[]> => {
    return this.apiService.get(apiURLs.planningProject, {});
  };

  createProject = (project: EditPlanningProject): Observable<PlanningProject> => {
    return this.apiService.post(apiURLs.planningProject, project, {});
  };

  updateProject = (project: EditPlanningProject): Observable<PlanningProject> => {
    return this.apiService.put(apiURLs.planningProject, project, {});
  }

  deleteProject = (projectId: number): Observable<void> => {
    return this.apiService.delete(apiURLs.planningProjectWithId(projectId.toString()), {});
  }
}
