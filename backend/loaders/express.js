const hello = require('../routes/hello');
const estudiante = require('../routes/Estudiantes');
const asignacion = require('../routes/asignaciones');
const sesiones = require('../routes/sesiones');

module.exports = app => {
  hello(app);
  estudiante(app);
  asignacion(app);
  sesiones(app);
};
