import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  ingresar(forma: NgForm) {
    console.log(forma.valid);
    console.log(forma.value);
  }

}
