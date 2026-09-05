import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  TronInputComponent,
  TronProgressComponent,
  TronTabComponent,
  TronTabsComponent,
} from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-tabs-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TronInputComponent,
    TronProgressComponent,
    TronTabComponent,
    TronTabsComponent,
  ],
  templateUrl: './tabs-page.component.html',
})
export class TabsPageComponent {
  readonly active$ = signal(0);
  readonly callsign = new FormControl('');
}
