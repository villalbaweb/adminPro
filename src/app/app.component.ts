import { Component } from '@angular/core';

import { SettingsService } from './services/service.index';

declare function Init_CustomJs_Plugin();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private settingService: SettingsService) {
    Init_CustomJs_Plugin();
  }

  
}
