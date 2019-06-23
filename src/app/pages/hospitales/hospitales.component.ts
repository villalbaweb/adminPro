import { Component, OnInit } from '@angular/core';
//import swal from 'sweetalert';

declare var swal: any;

import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html'
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  skyp: number = 0;
  take: number = 3;

  totalRegistros: number = 0;

  loading: boolean = true;

  constructor(private hospitalService: HospitalService) { }

  ngOnInit() {
  }

  buscarHospital( termino: string ){

    if( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.loading = true;

    this.hospitalService.BuscarHospital( termino )
    .subscribe((hospitales: Hospital[]) => {
      console.log(hospitales);
      this.hospitales = hospitales;
      this.loading = false;
    });
  }

  cargarHospitales() {
    this.loading = true;
    this.hospitalService.CargarHospitales(this. skyp, this.take)
    .subscribe((hospitals : any) => {
      console.log(hospitals);
      this.totalRegistros = hospitals.totalRecords;
      this.hospitales = hospitals.hospitales;
      this.loading = false;
    });
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
