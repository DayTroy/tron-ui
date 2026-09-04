import { Component, signal } from '@angular/core';
import { TronStepperComponent } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-stepper-page',
  standalone: true,
  imports: [TronStepperComponent],
  templateUrl: './stepper-page.component.html',
})
export class StepperPageComponent {
  readonly current$ = signal(0);
  readonly steps = [
    { name: 'IDENTITY' },
    { name: 'ACCESS' },
    { name: 'LOAD' },
    { name: 'INITIALIZATION' },
  ];
}
