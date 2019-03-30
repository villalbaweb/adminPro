import { Pipe, PipeTransform, ɵConsole } from '@angular/core';

import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'usuarios'): any {
    let url = URL_SERVICIOS + '/img';

    // Google user images
    if (imagen.indexOf('https') >= 0 ) url = imagen;

    // Default image
    else if(!imagen) url += 'usuarios/XYZ';
    
    else url += `/${tipo}/${imagen}`;

    console.log(url);

    return url;
  }

}
