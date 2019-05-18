import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  isHide: boolean = false;

  constructor() {
    console.log('Modal Listo');
  }

  ngOnInit() {
  }

  closeModal() {
    this.isHide = true;
    console.log(this.isHide);
  }

}
