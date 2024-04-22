const { connection } = require("../config.db");

// Obtener todas las asignaciones
const GetAsignaciones = (req, res) => {

    const fecha = req.query.fecha; 
   
    if (!fecha) {
        res.status(400).json({ error: "Falta el parámetro fecha" });
        return;
    }

    connection.query("CALL SP_GetAsignaciones(?)", [fecha], (error, results) => {
      if (error) {
        console.error("Error obteniendo asignaciones:", error);
        res.status(500).json({ error: "Error obteniendo asignaciones" });
        return;
      }
  
      // Estructura de datos esperada en el formato JSON final
      const sesiones = {};
  
      // Iterar sobre los resultados del procedimiento almacenado
      results[0].forEach(asignacion => {
        const { sesion, fecha_inicio, fecha_fin, hora_inicio, hora_fin , cupo , cupo_disponible  , Id_sesion , Descripcion_dia} = asignacion;
        if (!sesiones[sesion]) {
          // Si es la primera asignación para esta sesión, inicializa el array
          sesiones[sesion] = [];
        }
        // Agrega la asignación al array correspondiente a la sesión
        sesiones[sesion].push({ fecha_inicio, fecha_fin,  hora_inicio, hora_fin , cupo , cupo_disponible , Id_sesion , Descripcion_dia });
      });
  
      // Formatear el resultado en el formato JSON deseado
      const formattedResult = { sesiones };
  
      res.status(200).json(formattedResult);
    });
  };
  
  

const CreateAsignacion = (req, res) => {
    const { idEstudiante, idSesion } = req.body;
    console.log(idEstudiante);
  
    // Validación de datos
    if (!idEstudiante || !idSesion) {
      return res.status(400).json({ error: "Los campos idEstudiante y idSesion son obligatorios" });
    }
  
    connection.query("CALL SP_CreateAsignacion(?, ?)", [idEstudiante, idSesion], (error, result) => {
      if (error) {
        console.error("Error creando asignación:", error);
        return res.status(500).json({ error: "Error creando asignación" });
      }
      if (result && result[0]) {
        console.log(result);
        // Verificar el tipo de mensaje retornado por el procedimiento almacenado
        const message = result[0][0].message;
        console.log(result);
        if (message) {
          // La asignación se creó exitosamente
          return res.status(200).json({ message, id: result[0][0].ID_ASIGNACION });
        } else {
          // No hay cupo disponible en la sesión
          return res.status(400).json({ error:  result[0] });
        }
      }
      // Manejo de situaciones inesperadas
      return res.status(500).json({ error: "Error desconocido al crear asignación" });
    });
  };

// Obtener una asignación por su ID
const GetAsignacionById = (req, res) => {
    const id_sesion = req.query.id_sesion;
  
    if (!id_sesion) {
      res.status(400).json({ error: "Falta el parámetro id_sesion" });
      return;
    }
  
    connection.query("CALL SP_GetEstudiantesDisponibles(?)", [id_sesion], (error, results) => {
      if (error) {
        console.error("Error obteniendo estudiantes disponibles:", error);
        res.status(500).json({ error: "Error obteniendo estudiantes disponibles" });
        return;
      }
  
      res.status(200).json(results[0]);
    });
};

// Actualizar una asignación por su ID
const UpdateAsignacion = (req, res) => {
  const id = req.params.id;
  const { fechaAsignacion, idEstudiante, idSesion, estado } = req.body;
  connection.query("CALL SP_UpdateAsignacion(?, ?, ?, ?, ?)", [id, fechaAsignacion, idEstudiante, idSesion, estado], (error, result) => {
    if (error) {
      console.error("Error actualizando asignación:", error);
      res.status(500).json({ error: "Error actualizando asignación" });
      return;
    }
    res.status(200).json({ message: "Asignación actualizada exitosamente", id });
  });
};

// Eliminar una asignación por su ID
const DeleteAsignacion = (req, res) => {
  const id = req.params.id;
  connection.query("CALL SP_DeleteAsignacion(?)", [id], (error, result) => {
    if (error) {
      console.error("Error eliminando asignación:", error);
      res.status(500).json({ error: "Error eliminando asignación" });
      return;
    }
    res.status(200).json({ message: "Asignación eliminada exitosamente", id });
  });
};


module.exports = {
  GetAsignaciones,
  CreateAsignacion,
  GetAsignacionById,
  UpdateAsignacion,
  DeleteAsignacion
};
