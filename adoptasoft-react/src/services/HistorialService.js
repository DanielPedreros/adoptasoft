import HistorialRepository from '../repositories/HistorialRepository.js';
import Historial from '../models/Historial.js';

export default class HistorialService {
  getAll() {
    return HistorialRepository.getAll();
  }

  getRecords(paciente) {
    return HistorialRepository.getRecords(paciente);
  }

  addRecord(data) {
    const registro = new Historial({
      id: `h-${Date.now()}`,
      paciente: data.paciente,
      tipo: data.tipo,
      desc: data.descripcion,
      dateLabel: data.fecha,
      med: data.medicacion,
      cssClass: data.tipo === 'Vacuna' ? 'vac' : data.tipo === 'Diagnóstico' ? 'diag' : '',
      icon: data.tipo === 'Vacuna' ? '💉' : data.tipo === 'Diagnóstico' ? '🔬' : '🩺',
    });
    return HistorialRepository.add(registro);
  }
}
