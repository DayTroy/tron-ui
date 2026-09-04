import { Component, signal } from '@angular/core';
import { TronToggleComponent } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-toggle-page',
  standalone: true,
  imports: [TronToggleComponent],
  templateUrl: './toggle-page.component.html',
})
export class TogglePageComponent {
  readonly on$ = signal(false);
  readonly light$ = signal(false);
}
