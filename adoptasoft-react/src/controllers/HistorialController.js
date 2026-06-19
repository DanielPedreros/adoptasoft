import HistorialService from '../services/HistorialService.js';

const historialService = new HistorialService();

export default class HistorialController {
  getAll() {
    return historialService.getAll();
  }

  getRecords(paciente) {
    return historialService.getRecords(paciente);
  }

  addRecord(data) {
    return historialService.addRecord(data);
  }
}
