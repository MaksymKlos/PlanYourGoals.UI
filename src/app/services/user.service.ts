import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { apiURLs } from '../types/constants/apiUrls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  getUser = (): Observable<User> => {
    return this.apiService.get(apiURLs.user, {});
  }

  updateUser = (user: User): Observable<User> => {
    return this.apiService.put(apiURLs.user, user, {});
  }
}
