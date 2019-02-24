import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';

import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) { }

  Login(usuario: Usuario, recordar: boolean = false) {

    const url = URL_SERVICIOS + '/login';
    
    return this.http.post(url, usuario)
    .pipe(
      map((resp: any) => {
        localStorage.setItem('id', resp.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        
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
