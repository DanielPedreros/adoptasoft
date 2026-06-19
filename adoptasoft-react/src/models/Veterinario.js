export default class Veterinario {
  constructor({ id, nombre, especialidad, clinica, registro, horario, activo = false }) {
    this.id = id;
    this.nombre = nombre;
    this.especialidad = especialidad;
    this.clinica = clinica;
    this.registro = registro;
    this.horario = horario;
    this.activo = activo;
  }
}
