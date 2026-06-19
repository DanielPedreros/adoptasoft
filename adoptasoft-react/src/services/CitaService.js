import CitaRepository from '../repositories/CitaRepository.js';
import Cita from '../models/Cita.js';

export default class CitaService {
  getAll() {
    return CitaRepository.getAll();
  }

  getAvailableSlots() {
    return CitaRepository.getAvailableSlots();
  }

  scheduleCita(data) {
    const cita = new Cita({
      id: `c-${Date.now()}`,
      mascota: data.mascota,
      veterinario: data.veterinario,
      tipo: data.tipo || 'Consulta',
      fecha: data.fecha,
      hora: data.hora,
      motivo: data.motivo,
      estado: 'Confirmada',
    });
    return CitaRepository.add(cita);
  }
}
