import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  tipo: string;
  id: string;
  imagenTemp: string;

  isHide: boolean = true;

  notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Modal upload service listp');
  }

  ocultarModal() {
    this.isHide = true;
    this.tipo = null;
    this.id = null;
    this.imagenTemp = null;
  }

  mostrarModal( tipo: string, id: string, imagenTemp: string) {
    this.isHide = false;
    this.tipo = tipo;
    this.id = id;
    this.imagenTemp = imagenTemp;
  }
}
