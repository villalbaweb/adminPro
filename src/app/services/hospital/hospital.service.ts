import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import swal from 'sweetalert';

import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable()
export class HospitalService {

  constructor(private http: HttpClient) { }

  CargarHospitales( skip: number, take: number ) {
    let url = URL_SERVICIOS + `/hospital?skip=${skip}&take=${take}`;

    return this.http.get( url );
  }
}
