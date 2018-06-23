import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document  ) { }

  ngOnInit() {
  }

  cambiarColor(nuevoColor: string, link: any) {
    console.log(link);

    this.applicarCheck(link);

    const themeUrl = `assets/css/colors/${nuevoColor}.css`;
    this._document.getElementById('tema').setAttribute('href', themeUrl);
  }

  applicarCheck( link : any ) {

    const selectores: any = document.getElementsByClassName('selector');

    for( let ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

}
