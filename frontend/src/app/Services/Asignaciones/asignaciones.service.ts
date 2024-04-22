import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAsignaciones(fecha: any): Observable<any[]> {
    let params = new HttpParams();
    params = params.set('fecha', fecha);
    return this.http.get<any[]>(`${this.baseUrl}/asignaciones`, { params });
  }

  crearAsignacion(asignacion: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/asignaciones`, asignacion);
  }

  getAsignacionById(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('id_sesion', id);    
    return this.http.get<any>(`${this.baseUrl}/estudiantes-disponibles` ,  { params });
  }

  actualizarAsignacion(id: number, asignacion: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/asignaciones/${id}`, asignacion);
  }

  eliminarAsignacion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/asignaciones/${id}`);
  }
}
