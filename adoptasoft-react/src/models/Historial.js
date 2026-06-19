export default class Historial {
  constructor({ id, paciente, tipo, desc, dateLabel, med, cssClass, icon }) {
    this.id = id;
    this.paciente = paciente;
    this.tipo = tipo;
    this.desc = desc;
    this.dateLabel = dateLabel;
    this.med = med;
    this.cssClass = cssClass;
    this.icon = icon;
  }
}
