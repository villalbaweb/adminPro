import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import swal from 'sweetalert';

import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient,
      private router: Router,
      private subirArchivoService: SubirArchivoService) {
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

  Logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
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

  ActualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/user/' + usuario._id;
    url += '?token=' + this.token;
    console.log(url);

    return this.http.put(url, usuario)
    .pipe(
      map((resp: any) => {

        if( usuario._id === this.usuario._id) {
          this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
        }
        
        swal('Usuario actualizado', usuario.nombre, 'success');
        return resp;
      })
    );
  }

  
  CambiarImagen(file: File, id: string) {
    this.subirArchivoService.subirArchivo(file,'usuarios', id)
    .then((response: any) => {
      console.log(response);
      this.usuario.img = response.usuario.img;
      swal('Imagen actualizada', this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario);
    })
    .catch(error => {
      console.log(error);
    });
  }

  CargarUsuarios( skip: number, take: number ) {
    let url = URL_SERVICIOS + `/user?skip=${skip}&take=${take}`;

    return this.http.get( url );
  }

  BuscarUsuario ( termino: string ) {
    let url = URL_SERVICIOS + `/busqueda/coleccion/usuarios/${termino}`

    return this.http.get( url )
    .pipe(
      map(( response: any ) =>  {return response.usuarios} )
    );
  }

  BorrarUsuario( userId: string ) {
    let url = URL_SERVICIOS + `/user/${userId}?token=${this.token}`;

    return this.http.delete( url )
    .pipe(
      map((resp: any) => {
        swal('Usuario eliminado', 'Usuario eliminado correctamente', 'success');
        return true;
      })
    );
  }
}
