import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

interface Ajuste {
  temaUrl: string;
  tema: string;
}

@Injectable()
export class SettingsService {

  ajustes: Ajuste = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }

  constructor( @Inject(DOCUMENT) private _document) {
    this.cargarAJustes();
  }

  aplicarAjustes(nuevoColor: string) {
    
    this.ajustes.tema = nuevoColor;
    this.ajustes.temaUrl = `assets/css/colors/${nuevoColor}.css`;

    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));

    this.cambiarTema(this.ajustes);
  }

  cargarAJustes() {
    if(localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    }
    this.cambiarTema(this.ajustes);
  }

  cambiarTema(tema: Ajuste) {
    this._document.getElementById('tema').setAttribute('href', tema.temaUrl);
  }
}
