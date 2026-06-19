export default class Usuario {
  constructor({ id, nombre, email, role, telefono = '', documento = '', password = '' }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.role = role;
    this.telefono = telefono;
    this.documento = documento;
    this.password = password;
  }
}
