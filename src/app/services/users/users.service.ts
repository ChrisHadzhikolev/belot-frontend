import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from '../base/base.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private baseService: BaseApiService, private http: HttpClient) {}

  verifyCode(secretCode: string): Observable<any> {
    const url = this.baseService.getBackendApiUrl() + 'users/secret';
    return this.http.post(
        url,
      {
        secretCode: secretCode
      },
    );
  }

  checkUsername(username: string): Observable<any> {
    const url = this.baseService.getBackendApiUrl() + 'users/username';
    return this.http.post(
        url,
      {
        username: username
      },
    );
  }

  login(username: string, password: string): Observable<any> {
    const url = this.baseService.getBackendApiUrl() + 'users/signin';
    return this.http.post(
        url,
      {
        username,
        password,
      },
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    const url = this.baseService.getBackendApiUrl() + 'users/signup';
    return this.http.post(
      url,
      {
        username,
        password,
      },
      httpOptions,
    );
  }

  logout() {
    const url = this.baseService.getBackendApiUrl() + 'users/logout';
    return this.http.post(url, {}, httpOptions);
  }
}
