const express = require("express");
const app = express();
const { 
  GetSesiones,
  CreateSesion,
  UpdateSesion,
  GetSesionById,
  DeleteSesion
} = require('../controllers/sesiones');

/**
 * @swagger
 * tags:
 *   name: Sesiones
 *   description: Operaciones relacionadas con sesiones
 *
 * /sesiones:
 *   get:
 *     summary: Obtener todas las sesiones
 *     tags: [Sesiones]
 *     responses:
 *       200:
 *         description: Retorna todas las sesiones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Id_sesion:
 *                     type: integer
 *                   Nombre:
 *                     type: string
 *                   Start_datetime:
 *                     type: date
 *                   End_datetime:
 *                     type: date
 *                   Cupo:
 *                     type: integer
 *   post:
 *     summary: Crear una nueva sesión
 *     tags: [Sesiones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               start_datetime:
 *                 type: string
 *               end_datetime:
 *                 type: string
 *               cupo:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sesión creada exitosamente
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
    // Listar todas las sesiones
    app.get('/sesiones', (req, res) => {    
      GetSesiones(req, res);
    });
  
    // Crear una nueva sesión
    app.post('/sesiones', (req, res) => {
      CreateSesion(req, res);
    });
  
    // Obtener una sesión por su ID
    app.get('/sesiones/:id', (req, res) => {
      GetSesionById(req, res);
    });
  
    // Actualizar una sesión por su ID
    app.put('/sesiones/:id', (req, res) => {
      UpdateSesion(req, res);
    });
  
    // Eliminar una sesión por su ID
    app.delete('/sesiones/:id', (req, res) => {
      DeleteSesion(req, res);
    });
};
