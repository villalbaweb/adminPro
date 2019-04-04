import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphs1Component } from './graphs1/graphs1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

import { LoginGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { Titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { Titulo: 'Progress Sample'} },
            { path: 'graphs1', component: Graphs1Component, data: { Titulo: 'Graphs Sample'} },
            { path: 'promesas', component: PromesasComponent, data: { Titulo: 'Promises Sample'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: { Titulo: 'Account Settings'} },
            { path: 'profile', component: ProfileComponent, data: { Titulo: 'Perfile de Usuario'} },
            { path: 'rxjs', component: RxjsComponent, data: { Titulo: 'RxJS Sample'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
