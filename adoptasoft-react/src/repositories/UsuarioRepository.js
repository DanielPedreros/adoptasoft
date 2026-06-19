import Usuario from '../models/Usuario.js';

class UsuarioRepository {
  constructor() {
    this.usuarios = [
      new Usuario({ id: 'u-owner', nombre: 'Paula Rodríguez', email: 'dueno@demo.com', role: 'owner', documento: 'CC 1013592860', password: '123' }),
      new Usuario({ id: 'u-vet', nombre: 'Dr. Carlos Ramírez', email: 'vet@demo.com', role: 'vet', documento: 'RM 2045', password: '123' }),
      new Usuario({ id: 'u-admin', nombre: 'Admin Adoptasoft', email: 'admin@demo.com', role: 'admin', password: '123' }),
    ];
  }

  getAll() {
    return [...this.usuarios];
  }

  add(usuario) {
    this.usuarios.unshift(usuario);
    return usuario;
  }

  findByEmail(email) {
    return this.usuarios.find(user => user.email === email);
  }
}

export default new UsuarioRepository();
