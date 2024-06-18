import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BotRequest, BotResponse } from '../models/bot';
import { Observable } from 'rxjs';
import { apiURLs } from '../types/constants/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(private apiService: ApiService) { }

  sendMessage = (botRequest: BotRequest): Observable<BotResponse> => {
    return this.apiService.post(apiURLs.bot, botRequest, {});
  }
}
