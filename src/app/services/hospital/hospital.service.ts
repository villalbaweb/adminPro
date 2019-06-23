import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import swal from 'sweetalert';

import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../service.index';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable()
export class HospitalService {

  constructor(private http: HttpClient,
    private usuarioService: UsuarioService) { }

  CargarHospitales( skip: number, take: number ) {
    let url = URL_SERVICIOS + `/hospital?skip=${skip}&take=${take}`;

    return this.http.get( url );
  }

  ObtenerHospital( id: string) {
    let url = URL_SERVICIOS + `/hospital/${id}`;

    return this.http.get( url );
  }

  BorrarHospital( id: string ) {
    let url = URL_SERVICIOS + `/hospital/${id}?token=${this.usuarioService.token}`

    return this.http.delete( url )
    .pipe(
      map((resp: any) => {
        swal('Hospital Eliminado', 'Hospital eliminado correctamente', 'success');
        return true;
      })
    );
  }

  CrearHospital( nombre: string, img?: string ) {
    console.log(nombre);

    const hospital: Hospital = new Hospital(nombre, img);

    const url = URL_SERVICIOS + `/hospital?token=${this.usuarioService.token}`;
  
    return this.http.post (url, hospital)
      .pipe(
        map((resp: any) => {
          swal('Hospital creado', hospital.nombre, 'success');
          return resp.hospital;
        }));
  }

  BuscarHospital( termino: string ) {
    let url = URL_SERVICIOS + `/busqueda/coleccion/hospitales/${termino}`

    return this.http.get( url )
    .pipe(
      map(( response: any ) =>  {return response.hospitales} )
    );
  }

  ActualizarHospital( hospital:Hospital ) {
    let url = URL_SERVICIOS + `/hospital/${hospital._id}?token=${this.usuarioService.token}`;

    return this.http.put(url, hospital)
    .pipe(
      map((resp: any) => {
        
        swal('Usuario actualizado', hospital.nombre, 'success');
        return resp;
      })
    );
  }
}
