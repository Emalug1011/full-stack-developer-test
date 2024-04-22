import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/estudiantes`);
  }

  crearEstudiante(estudiante: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/estudiantes`, estudiante);
  }

  getEstudianteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/estudiantes/${id}`);
  }

  actualizarEstudiante(id: number, estudiante: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/estudiantes/${id}`, estudiante);
  }

  eliminarEstudiante(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/estudiantes/${id}`);
  }
}
