import Cita from '../models/Cita.js';

class CitaRepository {
  constructor() {
    this.citas = [
      new Cita({ id: 'c-1', mascota: 'Max - Labrador', veterinario: 'Dr. Ramírez', tipo: 'Consulta General', fecha: '20 May 2025', hora: '10:00', estado: 'Confirmada' }),
    ];
    this.availableSlots = ['08:00', '10:00', '14:00', '15:00', '17:00'];
  }

  getAll() {
    return [...this.citas];
  }

  add(cita) {
    this.citas.unshift(cita);
    return cita;
  }

  getAvailableSlots() {
    return [...this.availableSlots];
  }
}

export default new CitaRepository();
