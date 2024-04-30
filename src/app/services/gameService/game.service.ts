import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { BaseApiService } from '../base/base.service';
import { Game } from 'src/app/models/game/game.model';
import { ApiResponse } from 'src/app/models/ApiResponse/api-response.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class GameService {
    constructor(private baseService: BaseApiService, private http: HttpClient) {}

    getAllGames(): Observable<any> {
        const url = this.baseService.getBackendApiUrl() + `data/game/all`;
        const headers = this.baseService.getHeaders(true);
        return this.http.get(url, {headers}).pipe(
            //@ts-ignore
          map((result: ApiResponse) => {
            return result.data as Game[];
          }),
          catchError(() => {
            throw new Error('Something went wrong, could not get the games.');
          }),
        );
      }

  saveGame(game: Game): Observable<any> {
    const url = this.baseService.getBackendApiUrl() + 'data/game';
    const headers = this.baseService.getHeaders(true);
    return this.http.post(url, { game }, {headers}).pipe(
        //@ts-ignore
      map((result: ApiResponse) => {
        return result.data as Game;
      }),
      catchError(() => {
        throw new Error('Something went wrong, could not save the game.');
      }),
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
