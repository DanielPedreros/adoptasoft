import MascotaService from '../services/MascotaService.js';

const mascotaService = new MascotaService();

export default class MascotaController {
  getAll() {
    return mascotaService.getAll();
  }

  addMascota(data) {
    return mascotaService.addMascota(data);
  }
}
