import UsuarioService from '../services/UsuarioService.js';

const usuarioService = new UsuarioService();

export default class UsuarioController {
  getAll() {
    return usuarioService.getAll();
  }

  create(data) {
    return usuarioService.addUsuario(data);
  }
}
