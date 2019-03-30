import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';

import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient) {
    this.loadStorage();
  }

  IsUserLoggedIn(): boolean {
    return this.token.length > 0;
  }

  loadStorage() {
    this.token = localStorage.getItem('token') ? localStorage.getItem('token') :'';
    this.usuario = localStorage.getItem('usuario') ? JSON.parse( localStorage.getItem('usuario') ): null;
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
     localStorage.setItem('id', id);
     localStorage.setItem('token', token);
     localStorage.setItem('usuario', JSON.stringify(usuario));

     this.usuario = usuario;
     this.token = token;
  }

  LoginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token})
    .pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return resp;
      })
    );
  }

  Login(usuario: Usuario, recordar: boolean = false) {

    const url = URL_SERVICIOS + '/login';
    
    return this.http.post(url, usuario)
    .pipe(
      map((resp: any) => {
        // localStorage.setItem('id', resp.id);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('usuario', JSON.stringify(resp.usuario));

        this.guardarStorage(resp.id, resp.token, resp.usuario);
        
        if(recordar) {
          localStorage.setItem('email', usuario.email);
        } else {
          localStorage.removeItem('email');
        }
        return resp;
      })
    );    

  }

  CrearUsuario( usuario: Usuario ) {
    console.log(usuario);
    const url = URL_SERVICIOS + '/user';

    return this.http.post (url, usuario)
      .pipe(
        map((resp: any) => {
          swal('Usuario creado', usuario.email, 'success');
          return resp.usuario;
        }));
  }
}
