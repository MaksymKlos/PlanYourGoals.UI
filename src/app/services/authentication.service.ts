import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { apiURLs } from '../types/constants/apiUrls';
import { AuthResponse, Login, Register } from '../models/authentication';
import { authentication } from '../types/constants/authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated = signal<boolean>(this.checkTokenInStorage());

  constructor(private apiService:ApiService) { }

  public register(user: Register): Observable<AuthResponse> {
    return this.apiService.post(apiURLs.register, user, {});
  }

  public login(user: Login): Observable<AuthResponse> {
    return this.apiService.post(apiURLs.login, user, {});
  }

  private checkTokenInStorage() : boolean{
    const token = localStorage.getItem(authentication.token);

    if(token && token.length > 0){
      return true;
    }

    return false;
  }
}
