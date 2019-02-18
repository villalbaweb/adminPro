import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  
  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
  }

  ingresar(forma: NgForm) {
    console.log(forma.valid);
    console.log(forma.value);

    if( forma.valid ) {
      let usuario = new Usuario(null, forma.value.email, forma.value.password);

      this.usuarioService.Login(usuario, forma.value.recuerdame)
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['dashboard']);
      })
    }
  }

}
