import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../services/auth/auth-guard';
import { CareerComponent } from './career.component';

export const ROUTES: Routes = [
    {
        path: 'career',
        canActivate: [AuthGuard],
        component: CareerComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ]
})
export class CareerRoutingModule { }
