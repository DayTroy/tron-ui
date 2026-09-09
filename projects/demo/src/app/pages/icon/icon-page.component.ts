import { Component } from '@angular/core';
import { TRON_ICON_NAMES, TronButtonComponent, TronIconComponent } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-icon-page',
  standalone: true,
  imports: [TronIconComponent, TronButtonComponent],
  templateUrl: './icon-page.component.html',
})
export class IconPageComponent {
  readonly names = TRON_ICON_NAMES;
}
