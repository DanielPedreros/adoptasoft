import MascotaRepository from '../repositories/MascotaRepository.js';
import Mascota from '../models/Mascota.js';

export default class MascotaService {
  getAll() {
    return MascotaRepository.getAll();
  }

  addMascota(data) {
    const mascota = new Mascota({
      id: `m-${Date.now()}`,
      nombre: data.nombre,
      especie: data.especie,
      raza: data.raza,
      edad: data.edad,
      peso: data.peso,
      sexo: data.sexo,
    });
    return MascotaRepository.add(mascota);
  }
}
