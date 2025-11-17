// src/app/services/session.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class SessionService {
  API_SESSION = environment.API_SESSION;

  constructor(private http: HttpClient) {}

  getMe() {
    return this.http
      .get<any>(`${this.API_SESSION}/me`, {
        withCredentials: true,
      })
      .pipe(
        map((user) => user),
        catchError((error) => {
          return of(null);
        })
      );
  }
}
