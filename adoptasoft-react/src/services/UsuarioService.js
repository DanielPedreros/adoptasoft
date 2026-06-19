import UsuarioRepository from '../repositories/UsuarioRepository.js';

export default class UsuarioService {
  getAll() {
    return UsuarioRepository.getAll();
  }

  addUsuario(data) {
    return UsuarioRepository.add(data);
  }
}
