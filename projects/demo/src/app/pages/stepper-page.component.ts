import { Component, signal } from '@angular/core';
import { TronStepperComponent } from '../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-stepper-page',
  standalone: true,
  imports: [TronStepperComponent],
  template: `
    <section class="catalog">
      <header class="catalog__head">
        <h1>Stepper</h1>
        <p>Named steps, current index is a model.</p>
      </header>

      <div class="catalog__block">
        <h2>Boot sequence</h2>
        <tron-stepper [data]="steps" [(currentStep)]="current$" />
      </div>
    </section>
  `,
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
