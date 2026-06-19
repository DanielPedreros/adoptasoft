import VeterinarioService from '../services/VeterinarioService.js';

const veterinarioService = new VeterinarioService();

export default class VeterinarioController {
  getAll() {
    return veterinarioService.getAll();
  }
}
