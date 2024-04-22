const express = require("express");
const app = express();
const { 
  GetEstudiantes,
  CreateEstudiante,
  GetEstudianteById,
  UpdateEstudiante,
  DeleteEstudiante
} = require('../controllers/estudiantes');

/**
 * @swagger
 * tags:
 *   name: Estudiantes
 *   description: Operaciones relacionadas con estudiantes
 *
 * /estudiantes:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Estudiantes]
 *     responses:
 *       200:
 *         description: Retorna todos los estudiantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   correo:
 *                     type: string
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Perez
 *               correo:
 *                 type: string
 *                 example: juan@example.com
 *     responses:
 *       200:
 *         description: Estudiante creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *   /{id}:
 *     get:
 *       summary: Obtener un estudiante por su ID
 *       tags: [Estudiantes]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del estudiante
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Retorna el estudiante encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   correo:
 *                     type: string
 *       examples:
 *         Example1:
 *           value:
 *             id: 1
 *             nombre: Juan Perez
 *             correo: juan@example.com
 *     put:
 *       summary: Actualizar un estudiante por su ID
 *       tags: [Estudiantes]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del estudiante
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: Juan Perez
 *                 correo:
 *                   type: string
 *                   example: juan@example.com
 *       responses:
 *         200:
 *           description: Estudiante actualizado exitosamente
 *     delete:
 *       summary: Eliminar un estudiante por su ID
 *       tags: [Estudiantes]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del estudiante
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Estudiante eliminado exitosamente
 *       examples:
 *         Example1:
 *           value:
 *             message: Estudiante eliminado correctamente
 */

module.exports = app => {
  // Listar todos los estudiantes
  app.get('/estudiantes', (req, res) => {    
    GetEstudiantes(req, res);
  });

  // Crear un nuevo estudiante
  app.post('/estudiantes', (req, res) => {
    CreateEstudiante(req, res);
  });

  // Obtener un estudiante por su ID
  app.get('/estudiantes/:id', (req, res) => {
    GetEstudianteById(req, res);
  });

  // Actualizar un estudiante por su ID
  app.put('/estudiantes/:id', (req, res) => {
    UpdateEstudiante(req, res);
  });

  // Eliminar un estudiante por su ID
  app.delete('/estudiantes/:id', (req, res) => {
    DeleteEstudiante(req, res);
  });
};
