import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

import { SubirArchivoService, ModalUploadService } from 'src/app/services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(private subirArchivoService: SubirArchivoService,
    private modalUploadService: ModalUploadService) {}

  ngOnInit() {
  }

  subirImagen() {
    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
    .then( response => {
      this.modalUploadService.notificacion.emit(response);
      this.closeModal();
    })
    .catch( error => {
      console.log(error);
    });
  }

  closeModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;

    this.modalUploadService.ocultarModal();
    console.log(this.modalUploadService.isHide);
  }

  seleccionImagen(archivo: File ) {
    console.log(archivo);

    if(!archivo) {
      this.imagenSubir = null;
      return null;
    }

    if(archivo.type.indexOf('image') < 0){
      swal('Solo imagenes', 'EL archivo seleccionado no es imagen', 'error');
      this.imagenSubir = null;
      return null;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend= () => this.imagenTemp = reader.result;
  }

}
