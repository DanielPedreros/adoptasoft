import AuthService from '../services/AuthService.js';

const authService = new AuthService();

export default class AuthController {
  login(data) {
    return authService.login(data);
  }

  register(data) {
    return authService.register(data);
  }

  recover(email) {
    return authService.recoverPassword(email);
  }
}
