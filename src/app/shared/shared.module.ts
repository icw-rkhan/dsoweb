import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { CustomFormsModule } from 'ngx-custom-validators';

import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AlertDialogComponent } from './dialogs/alert-dialog/alert-dialog.component';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { FooterActionsComponent } from './footer-actions/footer-actions.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { FeedGridComponent } from './feed-grid/feed-grid.component';
import { TermPolicyDialogComponent } from './dialogs/term-policy-dialog/term-policy-dialog.component';

const PIPES = [
  TruncatePipe
];

export const COMPONENTS = [
  SidebarComponent,
  ToolbarComponent,
  AlertDialogComponent,
  FeedCardComponent,
  FooterActionsComponent,
  FeedGridComponent,
  TermPolicyDialogComponent
];

export const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  // Angular material modules
  MatToolbarModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatTooltipModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSelectModule,
  MatDatepickerModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatTabsModule,
  MatGridListModule,
  CustomFormsModule,
  NgxMasonryModule,
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  exports: [
    ...PIPES,
    ...COMPONENTS,
    ...MODULES,
  ],
  entryComponents: [
    AlertDialogComponent,
    TermPolicyDialogComponent
  ]
})
export class SharedModule {
}
