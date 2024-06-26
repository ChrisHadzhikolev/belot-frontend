import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { BaseApiService } from '../base/base.service';
import { Player } from 'src/app/models/player/player.model';
import { ApiResponse } from 'src/app/models/ApiResponse/api-response.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  getCurrentUser() {
    const url = this.baseService.getBackendApiUrl() + 'users/current';
    return this.http.get(
        url,
        {headers: this.baseService.getHeaders(true)}
    );
  }
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

  getAllPlayers(): Observable<any> {
    const url = this.baseService.getBackendApiUrl() + `users/all`;
    const headers = this.baseService.getHeaders(true);
    return this.http.get(url, {headers}).pipe(
        //@ts-ignore
      map((result: ApiResponse) => {
        return result.data as Player[];
      }),
      catchError(() => {
        throw new Error('Something went wrong, could not get the players.');
      }),
    );
  }
}
