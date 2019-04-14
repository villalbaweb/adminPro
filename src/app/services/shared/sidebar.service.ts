import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

    menu: any = [
      {
        titulo: 'Principal',
        icono: 'mdi mdi-gauge',
        submenu: [
          { titulo: 'Dashboard', url: '/dashboard'},
          { titulo: 'Progress Bar', url: '/progress'},
          { titulo: 'Graficas', url: '/graphs1'},
          { titulo: 'Promesas', url: '/promesas'},
          { titulo: 'RxJS', url: '/rxjs'},
        ]
      },
      {
        titulo: 'Mantenimiento',
        icono: 'mdi mdi-folder-lock-open',
        submenu: [
          { titulo: 'Usuarios', url: '/usuarios'},
          { titulo: 'Hospitales', url: '/hospitales'},
          { titulo: 'Medicos', url: '/medicos'}
        ]
      },
    ];
  constructor() { }
}
