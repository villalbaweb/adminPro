import { Component, OnInit } from '@angular/core';

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
    this.hospitalService.CargarHospitales(0, 5)
    .subscribe((hospitals: any) => {
      this.hospitales = hospitals.hospitales;
      console.log(this.hospitales);
    });
  }

}
