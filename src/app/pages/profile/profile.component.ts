import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(private usuarioService: UsuarioService) {
    this.cleanUp();
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

  seleccionImagen(archivo: File ) {
    console.log(archivo);

    if(!archivo) {
      this.imagenSubir = null;
      return null;
    }

    if(archivo.type.indexOf('image') < 0){
      swal('Solo imagenes', 'EL archivo seleccionado no es imagen', 'error');
      this.imagenSubir = null;
      return null;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend= () => this.imagenTemp = reader.result;
  }


  subirImagen() {
    console.log(this.imagenSubir);
    this.usuarioService.CambiarImagen(this.imagenSubir, this.usuario._id);
    this.cleanUp();
  }

  cleanUp() {
    this.usuario = this.usuarioService.usuario;
    this.imagenSubir = null;
  }

}
