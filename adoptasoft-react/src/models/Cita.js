export default class Cita {
  constructor({ id, mascota, veterinario, tipo, fecha, hora, motivo, estado }) {
    this.id = id;
    this.mascota = mascota;
    this.veterinario = veterinario;
    this.tipo = tipo;
    this.fecha = fecha;
    this.hora = hora;
    this.motivo = motivo;
    this.estado = estado;
  }
}
