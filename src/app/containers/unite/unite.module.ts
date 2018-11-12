import { NgModule } from '@angular/core';

import { UniteComponent } from './unite.component';
import { UniteRoutingModule } from './unite.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        UniteRoutingModule,
        SharedModule
    ],
    declarations: [
        UniteComponent
    ]
})
export class UniteModule {}
