import UsuarioRepository from '../repositories/UsuarioRepository.js';
import Usuario from '../models/Usuario.js';

export default class AuthService {
  login({ email, password, selectedRole }) {
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      return { success: false, message: 'Correo y contraseña son requeridos.' };
    }
    const user = UsuarioRepository.findByEmail(normalizedEmail);
    if (!user) {
      return { success: false, message: 'Usuario no encontrado.' };
    }
    if (user.password !== password) {
      return { success: false, message: 'Contraseña incorrecta.' };
    }
    const role = selectedRole || user.role;
    if (role !== user.role) {
      return { success: false, message: 'El rol no coincide con el usuario.' };
    }
    return { success: true, role, user };
  }

  recoverPassword(email) {
    if (!email) return { success: false, message: 'Ingresa tu correo.' };
    return { success: true, message: `Enviamos el enlace de recuperación a ${email}.` };
  }

  register(data) {
    const existing = UsuarioRepository.findByEmail(data.email?.trim().toLowerCase());
    if (existing) {
      return { success: false, message: 'Ya existe un usuario con ese correo.' };
    }
    const usuario = new Usuario({
      id: `u-${Date.now()}`,
      nombre: data.nombre,
      email: data.email.trim().toLowerCase(),
      role: data.role || 'owner',
      telefono: data.telefono || '',
      documento: data.documento || '',
      password: data.password,
    });
    UsuarioRepository.add(usuario);
    return { success: true, message: 'Usuario registrado correctamente.' };
  }
}
