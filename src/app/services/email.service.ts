import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ContactEmail } from '../models/contact-email';
import { Observable } from 'rxjs';
import { apiURLs } from '../types/constants/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private apiService:ApiService) { }

  sendEmail = (email: ContactEmail): Observable<void> => {
    return this.apiService.post(apiURLs.email, email, {});
  }
}
