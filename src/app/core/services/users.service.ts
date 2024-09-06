import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from '../../Enum/const';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUsersByFilter(params: any): Observable<any> {
    return this.httpClient
      .get(API_URL + '/search', { params })
      .pipe(map((result: any) => result.data));
  }

  getUsers(): Observable<any> {
    return this.httpClient
      .get(API_URL + '/users')
      .pipe(map((result: any) => result.data));
  }

  getUserById(id: string): Observable<any> {
    return this.httpClient
      .get(API_URL + '/users/' + id)
      .pipe(map((result: any) => result.data));
  }

  postUsers(data: any): Observable<any> {
    return this.httpClient.post(API_URL + '/users', data);
  }

  putUser(data: any, id: string): Observable<any> {
    return this.httpClient.put(API_URL + '/users/' + id, data);
  }
}
