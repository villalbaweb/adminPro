import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup
  constructor() { }

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
    console.log(this.forma.valid);
    console.log(this.forma.errors);
    console.log(this.forma.value);
  }

}
