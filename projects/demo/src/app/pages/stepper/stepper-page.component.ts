import { Component, signal } from '@angular/core';
import { TronStepperComponent } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-stepper-page',
  standalone: true,
  imports: [TronStepperComponent],
  templateUrl: './stepper-page.component.html',
})
export class StepperPageComponent {
  readonly current$ = signal(2);
  readonly steps = [
    { name: 'Identity scan', description: 'Biometric verification' },
    { name: 'Grid access', description: 'Sector authorization' },
    { name: 'Program load', description: 'Memory allocation' },
    { name: 'Initialization', description: 'Boot sequence complete' },
  ];
}
