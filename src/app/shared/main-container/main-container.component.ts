import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'dso-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {

  @Input() displayMainActions: boolean;

  constructor() {
    this.displayMainActions = true;
  }

}
