import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class SessionService {
  API = environment.API;
  API_SESSION = environment.API_SESSION;

  constructor(private http: HttpClient) {}

  getAdminUsers() {
    return this.http.get<any[]>(`${this.API}/admin-users`, {
      withCredentials: true,
    });
  }

  getAdmin() {
    return this.http.get<any>(`${this.API_SESSION}/me`, {
      withCredentials: true,
    });
  }
}
