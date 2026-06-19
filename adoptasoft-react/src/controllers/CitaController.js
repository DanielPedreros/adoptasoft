import CitaService from '../services/CitaService.js';

const citaService = new CitaService();

export default class CitaController {
  getAll() {
    return citaService.getAll();
  }

  getAvailableSlots() {
    return citaService.getAvailableSlots();
  }

  scheduleCita(data) {
    return citaService.scheduleCita(data);
  }
}
