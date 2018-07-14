import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService  ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(nuevoColor: string, link: any) {
    console.log(link);

    this.applicarCheck(link);

    this.settingsService.aplicarAjustes(nuevoColor);
  }

  applicarCheck( link : any ) {

    const selectores: any = document.getElementsByClassName('selector');

    for( let ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    for( let ref of selectores) {
      if(ref.getAttribute('data-theme') === this.settingsService.ajustes.tema ) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
