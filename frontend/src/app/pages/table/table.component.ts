import { Component, OnInit } from '@angular/core';
import { SesionesService } from '../../Services/Sesiones/sesiones.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    sesiones: any[];
    nuevaSesion: any = {};

    constructor(private sesionesService: SesionesService , private toastr: ToastrService ,  private modalService: NgbModal) { }

    ngOnInit(){
        this. obtenerSesiones();
    }

    obtenerSesiones() {
        this.sesionesService.getSesiones().subscribe(
          data => {
            this.sesiones = data;
          },
          error => {
            console.error('Error al obtener sesiones:', error);
          }
        );
      }
    
      crearNuevaSesion() {
        // Concatenar fecha de inicio con hora de inicio
        const fechaInicioCompleta = `${this.nuevaSesion.fechaInicio}T${this.nuevaSesion.horaInicio}`;
    
        // Concatenar fecha de fin con hora de fin
        const fechaFinCompleta = `${this.nuevaSesion.fechaFin}T${this.nuevaSesion.horaFin}`;
    
        // Crear objeto con los datos de la sesión
        const sesion = {
          nombre: this.nuevaSesion.nombre,
          start_datetime: fechaInicioCompleta,
          end_datetime: fechaFinCompleta,
          cupo: this.nuevaSesion.cupo
        };
    
        // Llamar al servicio para crear la sesión
        this.sesionesService.crearSesion(sesion).subscribe(
          response => {
            this. obtenerSesiones();
            this.toastr.success('Sesión creada de manera exitosa');
            this.nuevaSesion = [];
           
          },
          error => {
            this.toastr.error('No se pudo gestionar tu solicitud.');
            // Aquí puedes manejar el error como desees
          }
        );
      }
    
      editarSesion(sesion: any) {
        sesion.editando = true;
      }
      
      guardarEdicion(sesion: any) {        
        if (!sesion.Nombre || !sesion.FechaInicio || !sesion.horaInicio || !sesion.FechaFin || !sesion.horaFin || !sesion.Cupo) {
            this.toastr.warning('Todos los campos son obligatorios');          
          return;
        }
      
        if (sesion.Cupo < 1) {
            this.toastr.warning('El cupo debe ser igual o mayor a 1');            
            return;
          }
        
        
        const fechaInicio = new Date(sesion.FechaInicio + 'T' + sesion.horaInicio);
        const fechaFin = new Date(sesion.FechaFin + 'T' + sesion.horaFin);
        if (fechaInicio >= fechaFin) {
            this.toastr.error('La fecha y hora de inicio deben ser anteriores a la fecha y hora de fin');          
          return;
        }      
        
        sesion.Start_datetime = sesion.FechaInicio + ' ' + sesion.horaInicio;        
        sesion.End_datetime = sesion.FechaFin + ' ' + sesion.horaFin;
              
        this.sesionesService.actualizarSesion(sesion.Id_sesion, sesion).subscribe(
          response => {            
            this.toastr.success('Sesión actualizada correctamente');
            sesion.editando = false; 
          },
          error => {  
            this.toastr.error('Error al actualizar la sesión');           
          }
        );
      }
      
      
      cancelarEdicion(sesion: any) {
        sesion.editando = false;
      }    
 
    
      eliminarSesion(id: number) {
        if (confirm('¿Estás seguro de que deseas eliminar esta sesión?')) {
          this.sesionesService.eliminarSesion(id).subscribe(
            () => {
              console.log('Sesión eliminada exitosamente');
              this.obtenerSesiones(); // Actualizar la lista de sesiones después de eliminar
            },
            error => {
              console.error('Error al eliminar sesión:', error);
            }
          );
        }
      }    

}
