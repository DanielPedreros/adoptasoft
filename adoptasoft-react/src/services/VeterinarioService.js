import VeterinarioRepository from '../repositories/VeterinarioRepository.js';

export default class VeterinarioService {
  getAll() {
    return VeterinarioRepository.getAll();
  }
}
