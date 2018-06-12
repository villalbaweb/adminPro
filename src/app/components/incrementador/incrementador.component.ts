import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number;

  @Output() nuevoCalculo: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onChanges( newValue: number) {

    //let elemHTML : any = document.getElementsByName('progreso')[0];
    if(newValue >=100) {
      this.progreso = 100;
    } else if (newValue <= 0){
      this.progreso = 0;
    } else {
      this.progreso = newValue
    }

    //elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.nuevoCalculo.emit(this.progreso);
  }

  cambiarValor(valor: number) {
    if(this.progreso <= 0 && valor < 0) {
      return
    }

    if(this.progreso >= 100 && valor > 0 ) {
      return
    }
    this.progreso = +this.progreso + valor;
    this.nuevoCalculo.emit(this.progreso);

    this.txtProgress.nativeElement.focus();
  }
}
