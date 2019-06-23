import { Component, OnInit } from '@angular/core';
//import swal from 'sweetalert';

declare var swal: any;

import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  constructor(private hospitalService: HospitalService) { }

  ngOnInit() {
    this.borrarHospital('5d0fd7ec3560f828807e7298');
  }

  borrarHospital( hospitalId: string ) {
    swal({
      title: 'Estas seguro ?',
      text: 'Esta a punto de borrar a ' + hospitalId,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {
      console.log( borrar );
      if( borrar ) {
        this.hospitalService.BorrarHospital( hospitalId )
        .subscribe((eliminado: boolean)  => {
          console.log(eliminado);
        });
      }
    });
  }

}
