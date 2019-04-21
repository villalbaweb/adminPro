import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  
  
  skyp: number = 0;
  take: number = 3;

  totalRegistros: number = 0;

  loading: boolean = true;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true;
    this.usuarioService.CargarUsuarios(this. skyp, this.take)
    .subscribe((users : any) => {
      console.log(users);
      this.totalRegistros = users.totalRecords;
      this.usuarios = users.usuarios;
      this.loading = false;
    });
  }

  cambiarDesde( valor: number ) {
    let localSkip = this.skyp + valor;

    if( localSkip >= this.totalRegistros) {
      return;
    }

    if ( localSkip < 0 ) {
      return;
    }

    this.skyp += valor;
    this.cargarUsuarios(); 
  }

}
