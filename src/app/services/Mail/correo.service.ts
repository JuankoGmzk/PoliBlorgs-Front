import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { correo} from '../../models/correo';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  private url = 'http://localhost:8080/api/v1/msg';


  constructor(private http: HttpClient) { 

  }


  EnviarCorreo(data: any): Observable<any> {
    return this.http.post(`${this.url}`, data)
  }


}
 
