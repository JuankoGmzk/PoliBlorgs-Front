import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlUser = 'http://localhost:8080/api/v1/User';

  constructor(private http: HttpClient) { 

  }

  getCustomers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlUser}`);
  }

  get(id: String): Observable<User> {
    return this.http.get<User>(`${this.urlUser}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.urlUser}`, data)
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.urlUser}/${id}`);
  }

  
  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.urlUser}/${id}`, data);
  }
}
