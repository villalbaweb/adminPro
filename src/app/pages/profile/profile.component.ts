import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(formulario: NgForm) {
    this.usuario.nombre = formulario.value.name;
    this.usuario.email = this.usuario.google ? this.usuario.email : formulario.value.email;

    this.usuarioService.ActualizarUsuario(this.usuario)
    .subscribe(data => {
      console.log(data);
    });
  }

}
