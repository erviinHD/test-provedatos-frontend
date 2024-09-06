import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from '../../Enum/const';

@Injectable({
  providedIn: 'root',
})
export class ProvinvesService {
  constructor(private httpClient: HttpClient) {}

  getProvinces(): Observable<any> {
    return this.httpClient
      .get(API_URL + '/province')
      .pipe(map((result: any) => result.data));
  }
}
