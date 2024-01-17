import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPerson } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  API: string = "http://localhost:9000" 

  constructor(private http: HttpClient) { }

  interpreter(trama: string): Observable<IPerson> {
    return this.http.post<IPerson>(`${this.API}/interpreted`, trama);
  }

}
