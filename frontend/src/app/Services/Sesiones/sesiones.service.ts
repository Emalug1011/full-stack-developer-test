import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionesService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSesiones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/sesiones`);
  }

  crearSesion(sesion: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sesiones`, sesion);
  }

  getSesionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sesiones/${id}`);
  }

  actualizarSesion(id: number, sesion: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/sesiones/${id}`, sesion);
  }

  eliminarSesion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/sesiones/${id}`);
  }
}
