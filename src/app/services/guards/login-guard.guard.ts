import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
      private router: Router) {}
  canActivate():  boolean {
    if (this.usuarioService.IsUserLoggedIn()) {
      console.log('User Logged In');
      return true;
    } else {
      console.log('User not Logged In');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
