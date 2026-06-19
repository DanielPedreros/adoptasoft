import Mascota from '../models/Mascota.js';

class MascotaRepository {
  constructor() {
    this.mascotas = [
      new Mascota({ id: 'm-1', nombre: 'Max', especie: '🐕 Perro', raza: 'Labrador', edad: '3 años', peso: '12', sexo: 'Macho' }),
      new Mascota({ id: 'm-2', nombre: 'Michi', especie: '🐈 Gato', raza: 'Persa', edad: '1 año', peso: '4', sexo: 'Hembra' }),
    ];
  }

  getAll() {
    return [...this.mascotas];
  }

  add(mascota) {
    this.mascotas.unshift(mascota);
    return mascota;
  }
}

export default new MascotaRepository();
