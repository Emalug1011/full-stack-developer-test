## Preguntas técnicas
## Responda las siguientes preguntas en un archivo de rebajas llamado Answers.md.

## ¿Cuánto tiempo dedicó a la prueba de codificación de backend?
Durante la prueba de codificación frontend, dediqué aproximadamente 3 horas
## ¿Qué agregarías a tu solución si tuvieras más tiempo?
 Autenticación de usuarios y mejorar la interfaz de usuario.

## ¿Cuales fueron los motivos de tu elección de arquitectura para este tipo de aplicación ?
Angular: Un framework frontend robusto y escalable, ideal para crear aplicaciones web de una sola página con funciones como enlace de datos bidireccional, inyección de dependencias y enrutamiento. Su estructura de proyecto bien definida facilita el desarrollo rápido.

Node.js: Una opción excelente para el backend, gracias a su alto rendimiento y escalabilidad, especialmente para aplicaciones con gran cantidad de solicitudes simultáneas. Facilita la colaboración del equipo de desarrollo al usar JavaScript en todo el stack, tanto en el frontend como en el backend.

En resumen: La combinación de Angular y Node.js ofrece una solución completa para el desarrollo web moderno, con un frontend potente y un backend escalable, ambos utilizando JavaScript.

Integración de MySQL con Angular y Node.js
MySQL, un sistema de gestión de bases de datos relacional (SGBD) popular, completa perfectamente la pila tecnológica Angular y Node.js, dando como resultado una solución robusta para el almacenamiento y la gestión de datos en aplicaciones web.

## ¿Cómo se pueden gestionar los casos posteriores a la medianoche para que se muestren el mismo día y no el siguiente?
En el diseño de mi solución, se aborda la gestión de casos posteriores a la medianoche mediante una clara indicación del día en el que se llevará a cabo la sesión. Esto significa que, independientemente de la hora en que comience una sesión, se registra y se muestra en el día correspondiente en la interfaz de usuario. De esta manera, los usuarios pueden identificar fácilmente cuándo ocurrirá cada sesión.

## ¿Cuánto tiempo dedicó a la prueba de codificación frontend? ¿Cuáles fueron tus mayores dificultades?
Durante la prueba de codificación frontend, invertí aproximadamente 3 horas. La configuración inicial del proyecto y la integración con librerías externas demandaron tiempo adicional debido a la necesidad de investigación y resolución de problemas. Sin embargo, a medida que avanzaba en la prueba, pude aprovechar la sólida base que había establecido, lo que me permitió completar las tareas restantes de manera más eficiente.

## ¿Cómo localizaría un problema de rendimiento en producción? ¿Alguna vez has tenido que hacer esto?
    Monitoreo continuo de activos como servidores de base de datos y servidores de aplicaciones.
    Monitoreo de elementos que conforman infrastuctura de la red y la revision de sus politicas para determinar que no se este generando una latencia en añgun elemento.
    Analisis de los de servidores y soluciones imnplementadas en la infrastructura.

    Si he tenido que realizar estas acciones debido a latencia en tiempo de respuesta de un API de firma de documentos.

## ¿Cuál fue la característica más útil que se agregó a la última versión del lenguaje elegido? Incluya un fragmento de código que muestre cómo lo ha utilizado.

        Aunque el two-way binding de Angular no es una característica nueva, sigue siendo una de mis favoritas debido a las numerosas ventajas que ofrece al trabajar con variables de manera sencilla.

        html        
        <td *ngIf="sesion.editando">
            <button class="btn btn-sm btn-success btn-round btn-icon" (click)="guardarEdicion(sesion)"><i class="fa fa-check"></i></button>
            <button class="btn btn-sm btn-danger btn-round btn-icon" (click)="cancelarEdicion(sesion)"><i class="fa fa-times"></i></button>
        </td>
        </tr>
        <tr *ngIf="sesion.editando">
            <td><input type="text" class="form-control" [(ngModel)]="sesion.Nombre"></td>
            <td><input type="date" class="form-control" [(ngModel)]="sesion.FechaInicio"></td>
            <td><input type="time" class="form-control" [(ngModel)]="sesion.horaInicio"></td>
            <td><input type="date" class="form-control" [(ngModel)]="sesion.FechaFin"></td>
            <td><input type="time" class="form-control" [(ngModel)]="sesion.horaFin"></td>
            <td><input type="number" class="form-control" [(ngModel)]="sesion.Cupo"></td>
            <td></td>
        </tr>
        Este fragmento de código muestra cómo el two-way binding permite manipular fácilmente los datos del formulario y actualizarlos en tiempo real en la vista y en el componente. Con esta funcionalidad, los botones de edición pueden activar o desactivar la edición de la sesión, mientras que los campos de entrada en la tabla se vinculan directamente a las propiedades del objeto sesion, permitiendo una interacción fluida y eficiente con los datos del formulario.

## ¿Que elementos de seguridad hubiera incluido en su API?
        JWT en el API
            JWT ofrece una solución segura, eficiente y flexible para la autenticación y autorización en APIs,         
        Monitoreo y trazabilidad de los eventos.
            Implementar un log para poder ir guardando los datos emplendo patrones de desarrollo como el event sourcing
        Exposición de Datos Sensibles (Sensitive Data Exposure) 
             Encriptaría los datos sensibles tanto en reposo como en tránsito utilizando algoritmos de cifrado fuertes.
        Cross-Site Request Forgery (CSRF)
            Implementaría tokens anti-CSRF en formularios y solicitudes para prevenir ataques de falsificación de solicitudes entre sitios.
        Deserialización Insegura (Insecure Deserialization)
            Validaría y autenticaría cuidadosamente los datos deserializados para evitar ataques de deserialización insegura
    
    Al incorporar estas medidas de seguridad, estaría trabajando para mitigar las principales vulnerabilidades y proteger mi API contra posibles ataques y violaciones de seguridad            
