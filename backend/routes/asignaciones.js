const express = require("express");
const app = express();
const { 
  GetAsignaciones,
  CreateAsignacion,
  UpdateAsignacion,
  GetAsignacionById,
  DeleteAsignacion,
  GetEstudiantesDisponibles
} = require('../controllers/asignaciones');

/**
 * @swagger
 * tags:
 *   name: Asignaciones
 *   description: Operaciones relacionadas con asignaciones
 *
 * /asignaciones:
 *   get:
 *     summary: Obtener todas las asignaciones
 *     tags: [Asignaciones]
 *     parameters:
 *     - in: query
 *       name: fecha
 *       schema:
 *         type: string
 *       required: true
 *       description: Fecha para filtrar las asignaciones (formato DD-MM-YYYY)
 *     responses:
 *       200:
 *         description: Retorna todas las asignaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_ASIGNACION:
 *                     type: integer
 *                   FECHA_ASIGNACION:
 *                     type: date
 *                   ID_ESTUDIANTE:
 *                     type: integer
 *                   ID_SESION:
 *                     type: integer
 *                   ESTADO:
 *                     type: integer
 *   post:
 *     summary: Crear una nueva asignación
 *     tags: [Asignaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idEstudiante:
 *                 type: integer
 *               idSesion:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Asignación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 */



module.exports = app => {
    // Listar todas las asignaciones
    app.get('/asignaciones', (req, res) => {    
      GetAsignaciones(req, res);
    });
  
    // Crear una nueva asignación
    app.post('/asignaciones', (req, res) => {
      CreateAsignacion(req, res);
    });
  
    // Obtener una asignación por su ID
    app.get('/asignaciones/:id', (req, res) => {
      GetAsignacionById(req, res);
    });
  
    // Actualizar una asignación por su ID
    app.put('/asignaciones/:id', (req, res) => {
      UpdateAsignacion(req, res);
    });
  
    // Eliminar una asignación por su ID
    app.delete('/asignaciones/:id', (req, res) => {
      DeleteAsignacion(req, res);
    });


    app.get('/estudiantes-disponibles', (req, res) => {
        GetAsignacionById(req, res);
      });    
};
