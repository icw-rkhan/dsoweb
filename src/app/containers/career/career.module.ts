import { NgModule } from '@angular/core';

import { CareerComponent } from './career.component';
import { CareerRoutingModule } from './career.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        CareerRoutingModule,
        SharedModule
    ],
    declarations: [
        CareerComponent
    ]
})
export class CareerModule {}
