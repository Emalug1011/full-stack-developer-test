import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // Import the module
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the day grid plugin
import { AsignacionesService } from '../../Services/Asignaciones/asignaciones.service';
import { ToastrService } from 'ngx-toastr';
 


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  selectedDate: Date; 
  FechaTitulo: string; 
  sesiones: any[] = [];
  DetalleSesion: any[] = [];
  FechaDesc: string; 
  HorarioDesc: string; 
  CupoDesc: number; 
  DesCurso: string;
  estudiantesDisponibles: any[] = [];
  estudianteSeleccionado: number | null = null;
  idSesionSeleccionado: number | null = null;
  modoAsignacionAlumno: boolean = false;
  selectedRowIndex: number = -1;

  constructor(private asignacionesService: AsignacionesService , private toastr: ToastrService) { }

  calendarOptions: any = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [
      { title: 'Event 1', start: '2024-04-25' },
      // Add more events as needed
    ]
  }; 

    ngOnInit(){}

    onDateSelect(date: any) {    
      const fechaSeleccionada = this.formatDate(date);  
      this.FechaTitulo = fechaSeleccionada;    
      this.asignacionesService.getAsignaciones(fechaSeleccionada).subscribe(
        (data: any) => { 
          // Limpiar los arreglos antes de agregar nuevos datos
          this.sesiones = [];
          this.DetalleSesion = [];
    
          // Iterar sobre el objeto data y extraer las sesiones y detalles
          for (const sesion in data.sesiones) {
            if (data.sesiones.hasOwnProperty(sesion)) {
              this.sesiones.push(sesion); 
              data.sesiones[sesion].forEach(detalle => {
                this.DetalleSesion.push({
                  sesion: sesion,
                  fecha_inicio: detalle.fecha_inicio,
                  fecha_fin: detalle.fecha_fin,
                  hora_fin: detalle.hora_fin,
                  hora_inicio: detalle.hora_inicio,
                  cupo: detalle.cupo,
                  Id_sesion: detalle.Id_sesion,
                  cupo_disponible: detalle.cupo_disponible,
                  Descripcion_dia: detalle.Descripcion_dia
                });
              });
            }
          }
        },
        error => {
          console.error('Error al obtener las asignaciones:', error);
        }
      );
    }
    

  formatDate(date: any): string {    
    const day = date.day < 10 ? '0' + date.day : date.day;
    const month = date.month < 10 ? '0' + date.month : date.month;
    const year = date.year;    
    return `${day}-${month}-${year}`;
  }

  AasignarEstudiante(data: any){
    const index = this.DetalleSesion.findIndex(item => item === data);
  
    // Actualiza el índice de la fila seleccionada
    this.selectedRowIndex = index;
    this.FechaDesc = data.Descripcion_dia; 
    this.HorarioDesc = data.hora_inicio; 
    this.CupoDesc = data.cupo_disponible;
    this.DesCurso = data.sesion; 
    this.idSesionSeleccionado = data.Id_sesion;  

    this.GetEstudiantes( this.idSesionSeleccionado);

  }

  GetEstudiantes(Id_sesion){
    this.estudiantesDisponibles = [];
    this.asignacionesService.getAsignacionById(Id_sesion).subscribe(
      (data: any[]) => {
        this.estudiantesDisponibles = data; // Almacena los datos en la variable estudiantesDisponibles
        this.modoAsignacionAlumno = true;
      },
      error => {
        console.error('Error al obtener estudiantes disponibles:', error);
      }
    ); 

  }
  
  agregarAlumno() {
    if (this.estudianteSeleccionado !== null) {
      const asignacion = {
        idEstudiante: this.estudianteSeleccionado,
        idSesion:  this.idSesionSeleccionado
      };

      this.asignacionesService.crearAsignacion(asignacion).subscribe(
        () => {
          this.toastr.success('Estudiante asignado exitosamente', '', {
            positionClass: 'toast-top-right' 
          });
          
          this.GetEstudiantes( this.idSesionSeleccionado);
          this.CupoDesc = this.CupoDesc - 1;
          if(this.CupoDesc == 0 ){
              this.modoAsignacionAlumno = false;
          }
         
        },
        error => {
          this.toastr.error(error.error.error[0].error , 'Error') ;          
          
        }
      );
    } else { 
      this.toastr.warning('Ningún estudiante seleccionado' , 'Warning');  
    }
  }  

}
