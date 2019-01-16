import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../services/auth/auth-guard';
import { EventComponent } from './event.component';

export const ROUTES: Routes = [
    {
        path: 'events',
        canActivate: [AuthGuard],
        component: EventComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ]
})
export class EventRoutingModule { }
