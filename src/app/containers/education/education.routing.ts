import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../services/auth/auth-guard';
import { EducationComponent } from './education.component';

export const ROUTES: Routes = [
    {
        path: 'education',
        canActivate: [AuthGuard],
        component: EducationComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ]
})
export class EducationRoutingModule { }
