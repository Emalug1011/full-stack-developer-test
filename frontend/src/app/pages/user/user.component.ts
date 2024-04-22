// user.component.ts

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlumnosService } from '../../Services/Alumnos/alumnos.service';
 

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    estudiantes: any[] = [];
    nuevoEstudiante: any = {}; // Nuevo estudiante a agregar
    estudianteEditando: any = null; // Estudiante en modo de edición
  
    constructor(private alumnosService: AlumnosService ,  private toastr: ToastrService) { }
  
    ngOnInit(): void {
      this.obtenerEstudiantes();
    }
  
    obtenerEstudiantes(): void {
      this.alumnosService.getEstudiantes().subscribe(
        (data: any) => {
            console.log(data);
          this.estudiantes = data;
        },
        (error: any) => {
          console.error('Error al obtener estudiantes:', error);
        }
      );
    }

    mostrarDetalles(estudiante: any): void {
        console.log('Detalles del estudiante:', estudiante);
    }    


    darDeBajaEstudiante(id: number): void {
        this.alumnosService.eliminarEstudiante(id).subscribe(
          () => {
            this.toastr.success('Estudiante eliminado exitosamente', '', {
                positionClass: 'toast-top-right' 
              });
            this.obtenerEstudiantes();
          },
          (error: any) => {
            console.error('Error al eliminar estudiante:', error);
          }
        );
      }    

    // Función para agregar un nuevo estudiante
    agregarEstudiante(): void {
        this.alumnosService.crearEstudiante(this.nuevoEstudiante).subscribe(
            () => {
                this.toastr.success('Estudiante creado exitosamente', '', {
                    positionClass: 'toast-top-right' 
                  });
                this.nuevoEstudiante = {}; // Limpiar el objeto para el siguiente estudiante
                this.obtenerEstudiantes(); // Actualizar la lista de estudiantes
            },
            (error: any) => {
                console.error('Error al crear estudiante:', error);
            }
        );
    }


    editarEstudiante(estudiante: any): void {
      // Habilitar el modo de edición para el estudiante seleccionado
      this.estudianteEditando = estudiante;
      this.estudianteEditando.editando = true;
  }

  guardarCambios(estudiante: any): void {
      // Deshabilitar el modo de edición y enviar los cambios al servidor
      this.estudianteEditando.editando = false;
      this.alumnosService.actualizarEstudiante(estudiante.Id_estudiante, estudiante).subscribe(
          () => {
              this.toastr.success('Estudiante actualizado exitosamente', '', {
                  positionClass: 'toast-top-right' 
                });
              this.obtenerEstudiantes(); // Actualizar la lista de estudiantes después de guardar cambios
          },
          (error: any) => {
              console.error('Error al actualizar estudiante:', error);
          }
      );
  } 
  
  cancelarEdicion(estudiante: any): void {
    // Revertir los cambios
    estudiante.editando = false;
 
  }
  


}
