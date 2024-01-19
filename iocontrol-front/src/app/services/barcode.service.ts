import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPerson } from '../interfaces/person';
import { IRegister } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  API: string = "http://localhost:9000" 

  constructor(private http: HttpClient) { }

  interpreter(trama: string): Observable<IPerson> {
    return this.http.post<IPerson>(`${this.API}/interpreted`, trama);
  }

  register(person: IPerson, numberCard: string): Observable<void> {
    return this.http.post<void>(`${this.API}/register?numberCard=${numberCard}`, person);
  }

  registerOutput(numberCard: number) :Observable<IRegister> {
    return this.http.post<IRegister>(`${this.API}/registerFinalDate?numberCard=${numberCard}`, {});
  }
}
