import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Achievement } from '../models/achievement';
import { apiURLs } from '../types/constants/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  constructor(private apiService:ApiService) { }

  getAll = (): Observable<Achievement[]> => {
    return this.apiService.get(apiURLs.achievement, {});
  }
}
