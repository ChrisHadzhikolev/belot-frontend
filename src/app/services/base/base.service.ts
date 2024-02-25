import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  getHeaders(includeToken = true, file = false): HttpHeaders {
    if (includeToken) {
      const t = localStorage.getItem('token');
      if (!t) {
        throw new Error('Unauthenticated, please login again!');
      }
      if(!file){
        return new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${t}`,
        });
      } else {
        return new HttpHeaders({
          Authorization: `Bearer ${t}`,
        });
      }
      
    }
    return new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      });;
}

  getBackendApiUrl(): string {
    return environment.endpoints.backend;
  }
}
