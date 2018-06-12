import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  constructor() { }

  ngOnInit() {
    console.log(this.progreso);
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
