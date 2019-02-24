import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

//Google singin
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  // Google singin
  auth2: any;
  
  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {

    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    this.recuerdame = this.email !== '';
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '286917515584-kutk0n9p4r9asahbo8ls5lrtql8p1ntf.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogleSignin'));

    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile();
      console.log(profile);

      var id_token = googleUser.getAuthResponse().id_token;
      console.log('Token:', id_token);

      this.usuarioService.LoginGoogle(id_token)
      .subscribe(result => {
        console.log(result);
        //this.router.navigate(['dashboard']);
        window.location.href = '/dashboard';
      });
    });
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
