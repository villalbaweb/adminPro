import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graphs1Component,
        PagesComponent,
        IncrementadorComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graphs1Component,
        PagesComponent,
    ],
    imports: [
        SharedModule,
        FormsModule,
        PAGES_ROUTES
    ]
})
export class PagesModule { }
