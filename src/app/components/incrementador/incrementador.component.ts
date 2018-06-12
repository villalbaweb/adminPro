import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  leyenda: string = 'Leyenda';
  progreso: number = 50;

  constructor() { }

  ngOnInit() {
  }

  cambiarValor(valor: number) {
    if(this.progreso <= 0 && valor < 0) {
      return
    }

    if(this.progreso >= 100 && valor > 0 ) {
      return
    }
    this.progreso = +this.progreso + valor;
  }
}
