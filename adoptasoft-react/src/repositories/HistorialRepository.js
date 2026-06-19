import Historial from '../models/Historial.js';

class HistorialRepository {
  constructor() {
    this.registros = [
      new Historial({ id: 'h-1', paciente: 'Max - Labrador', tipo: 'Vacuna', desc: 'Vacuna Antirrábica', dateLabel: '10 Ene 2025', med: 'Próxima: 10 Ene 2026', cssClass: 'vac', icon: '💉' }),
      new Historial({ id: 'h-2', paciente: 'Max - Labrador', tipo: 'Diagnóstico', desc: 'Otitis leve', dateLabel: '5 Mar 2025', med: 'Gotas otológicas x 7 días', cssClass: 'diag', icon: '🔬' }),
      new Historial({ id: 'h-3', paciente: 'Michi - Persa', tipo: 'Vacuna', desc: 'Triple Felina', dateLabel: '15 Feb 2025', med: '', cssClass: 'vac', icon: '💉' }),
    ];
  }

  getAll() {
    return [...this.registros];
  }

  getRecords(paciente) {
    return this.registros.filter(record => record.paciente === paciente);
  }

  add(registro) {
    this.registros.unshift(registro);
    return registro;
  }
}

export default new HistorialRepository();
