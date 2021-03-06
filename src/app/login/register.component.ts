import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import swal from 'sweetalert';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup
  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  passwordConfirmationMatch(element1: string, element2: string){

    return (group: FormGroup) => {
      let pwd1 = group.controls[element1].value;
      let pwd2 = group.controls[element2].value;

      return pwd1 === pwd2 ? null : {passwordConfirmationMatch: true};
    }
  }

  ngOnInit() {
  
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    },
    {
      validators: this.passwordConfirmationMatch ('password', 'password2')
    });
  }

  registrarUsuario() {

    if(!this.forma.value.condiciones) {
      swal("Importante", "Debe aceptar terminos y condiones", "warning");
    }

    console.log(this.forma.value);
    if(this.forma.valid) {

      const usuario = new Usuario(this.forma.value.nombre, this.forma.value.correo, this.forma.value.password);
      this.usuarioService.CrearUsuario(usuario)
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['login']);
      });
    }
  }

}
