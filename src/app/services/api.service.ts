import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOptions } from '../types/http-options';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  get<TReturn>(url:string, options: HttpOptions) : Observable<TReturn> {
    return this.httpClient.get<TReturn>(url, options) as Observable<TReturn>;
  }

  post<TReturn, TBody>(url:string, body: TBody, options: HttpOptions) : Observable<TReturn> {
    return this.httpClient.post<TReturn>(url, body, options) as Observable<TReturn>;
  }

  put<TReturn, TBody>(url:string, body: TBody, options: HttpOptions) : Observable<TReturn> {
    return this.httpClient.put<TReturn>(url, body, options) as Observable<TReturn>;
  }

  patch<TReturn, TBody>(url:string, body: TBody, options: HttpOptions): Observable<TReturn> {
    return this.httpClient.patch<TReturn>(url, body, options) as Observable<TReturn>;
  }

  delete<TReturn>(url:string, options: HttpOptions) : Observable<TReturn> {
    return this.httpClient.delete<TReturn>(url, options) as Observable<TReturn>;
  }
}
