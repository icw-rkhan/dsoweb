import { NgModule } from '@angular/core';

import { EventComponent } from './event.component';
import { EventRoutingModule } from './event.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        EventRoutingModule,
        SharedModule
    ],
    declarations: [
        EventComponent
    ]
})
export class EventModule {}
