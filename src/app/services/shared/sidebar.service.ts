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
        ]
      }
    ];
  constructor() { }
}
