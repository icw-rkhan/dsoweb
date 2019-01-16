import { NgModule } from '@angular/core';

import { EducationComponent } from './education.component';
import { EducationRoutingModule } from './education.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        EducationRoutingModule,
        SharedModule
    ],
    declarations: [
        EducationComponent
    ]
})
export class EducationModule {}
