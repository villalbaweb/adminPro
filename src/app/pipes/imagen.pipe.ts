import { Pipe, PipeTransform, ɵConsole } from '@angular/core';

import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'usuarios'): any {

    let url = URL_SERVICIOS + '/img';
    
    // Default image
    if(!imagen) url += '/usuarios/XYZ';

    // Google user images
    else if (imagen.indexOf('https') >= 0 ) url = imagen;
    
    else url += `/${tipo}/${imagen}`;

    console.log(url);

    return url;
  }

}
