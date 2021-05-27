import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { coments } from '../../models/coments';


@Injectable({
  providedIn: 'root'
})
export class ComentService {


  private url = 'http://localhost:8080/api/v1/Coment';

  constructor(private http: HttpClient) {

  }

  getComentsById(idUser: String): Observable<coments> {
    return this.http.get<coments>(`${this.url}/${idUser}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.url}`, data)
  }

  get(): Observable<coments[]> {
    return this.http.get<coments[]>(`${this.url}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  
  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }



}
