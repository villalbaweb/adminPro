import { Component, OnInit } from '@angular/core';

import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  user: Usuario;

  constructor(private sidebarService: SidebarService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.user = this.usuarioService.usuario;
  }

}
