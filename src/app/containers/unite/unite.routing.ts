import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../services/auth/auth-guard';
import { UniteComponent } from './unite.component';

export const ROUTES: Routes = [
    {
        path: 'unite',
        canActivate: [AuthGuard],
        component: UniteComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ]
})
export class UniteRoutingModule { }
