const { connection } = require("../config.db");

const GetEstudiantes = (request, response) => {
  connection.query("CALL SP_GetEstudiantes()", (error, results) => {
    if (error) {
      console.error("Error getting estudiantes:", error);
      response.status(500).json({ error: "Error getting estudiantes" });
      return;
    }
    response.status(200).json(results[0]);
  });
};

const CreateEstudiante = (request, response) => {
  
  const { nombre, correo } = request.body;

  if (!nombre || !correo) {
    return response.status(400).json({ error: 'Nombre y correo son obligatorios' });
  }

  connection.query("CALL SP_CreateEstudiante(?, ?)", [nombre, correo], (error, result) => {
    if (error) {
      console.error("Error creating estudiante:", error);
      return response.status(500).json({ error: "Error creating estudiante" });
    }
    response.status(200).json({ message: "Estudiante created successfully", id: result[0][0].id });
  });
};

const GetEstudianteById = (request, response) => {
  const id = request.params.id;
  connection.query("CALL SP_GetEstudianteById(?)", [id], (error, result) => {
    if (error) {
      console.error("Error getting estudiante:", error);
      response.status(500).json({ error: "Error getting estudiante" });
      return;
    }
    if (result[0].length === 0) {
      response.status(404).json({ error: "Estudiante not found" });
      return;
    }
    response.status(200).json(result[0][0]);
  });
};

const UpdateEstudiante = (request, response) => {
  const id = request.params.id;
  const { Nombre, Correo } = request.body;
  connection.query("CALL SP_UpdateEstudiante(?, ?, ?)", [id, Nombre, Correo], (error, result) => {
    if (error) {
      console.error("Error updating estudiante:", error);
      response.status(500).json({ error: "Error updating estudiante" });
      return;
    }
    response.status(200).json({ message: "Estudiante updated successfully", id });
  });
};

const DeleteEstudiante = (request, response) => {
  const id = request.params.id;
  connection.query("CALL SP_DeleteEstudiante(?)", [id], (error, result) => {
    if (error) {
      console.error("Error deleting estudiante:", error);
      response.status(500).json({ error: "Error deleting estudiante" });
      return;
    }
    response.status(200).json({ message: "Estudiante deleted successfully", id });
  });
};

module.exports = {
  GetEstudiantes,
  CreateEstudiante,
  GetEstudianteById,
  UpdateEstudiante,
  DeleteEstudiante
};