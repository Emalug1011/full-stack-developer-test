const { connection } = require("../config.db");

const GetSesiones = (request, response) => {
  connection.query("CALL SP_GetSesiones()", (error, results) => {
    if (error) {
      console.error("Error obteniendo sesiones:", error);
      response.status(500).json({ error: "Error obteniendo sesiones" });
      return;
    }
    response.status(200).json(results[0]);
  });
};

const CreateSesion = (request, response) => {
  
  const { nombre, start_datetime, end_datetime, cupo } = request.body;

  if (!nombre || !start_datetime || !end_datetime || !cupo) {
    return response.status(400).json({ error: 'Nombre, start_datetime, end_datetime y cupo son obligatorios' });
  }

  connection.query("CALL SP_CreateSesion(?, ?, ?, ?)", [nombre, start_datetime, end_datetime, cupo], (error, result) => {
    if (error) {
      console.error("Error creando sesión:", error);
      return response.status(500).json({ error: "Error creando sesión" });
    }
    response.status(200).json({ message: "Sesión creada exitosamente", id: result[0][0].Id_sesion });
  });
};

const GetSesionById = (request, response) => {
  const id = request.params.id;
  connection.query("CALL SP_GetSesionById(?)", [id], (error, result) => {
    if (error) {
      console.error("Error obteniendo sesión:", error);
      response.status(500).json({ error: "Error obteniendo sesión" });
      return;
    }
    if (result[0].length === 0) {
      response.status(404).json({ error: "Sesión no encontrada" });
      return;
    }
    response.status(200).json(result[0][0]);
  });
};

const UpdateSesion = (request, response) => {
  const id = request.params.Id_sesion;
  
  const { Id_sesion , Nombre, Start_datetime, End_datetime, Cupo } = request.body;
  console.log(Id_sesion);
  connection.query("CALL SP_UpdateSesion(?, ?, ?, ?, ?)", [Id_sesion, Nombre, Start_datetime, End_datetime, Cupo], (error, result) => {
    if (error) {
      console.error("Error actualizando sesión:", error);
      response.status(500).json({ error: "Error actualizando sesión" });
      return;
    }
    response.status(200).json({ message: "Sesión actualizada exitosamente", id });
  });
};

const DeleteSesion = (request, response) => {
    const id = request.params.id;
    connection.query("CALL SP_DeleteSesion(?)", [id], (error, results) => {
      if (error) {
        console.error("Error eliminando sesión:", error);
        response.status(500).json({ error: "Error eliminando sesión" });
        return;
      }
      
      // Verificar el resultado del procedimiento almacenado
      const p_success = results[0][0].p_success;
  
      if (p_success === 0) {
        response.status(400).json({ error: "No se puede eliminar la sesión porque tiene asignaciones activas" });
      } else {
        response.status(200).json({ message: "Sesión eliminada exitosamente", id });
      }
    });
  };
  
  

module.exports = {
  GetSesiones,
  CreateSesion,
  GetSesionById,
  UpdateSesion,
  DeleteSesion
};
