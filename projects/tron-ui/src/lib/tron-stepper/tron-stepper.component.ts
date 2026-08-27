import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

export interface TronStepItem {
  name: string;
}

@Component({
  selector: 'tron-stepper',
  imports: [],
  templateUrl: './tron-stepper.component.html',
  styleUrl: './tron-stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronStepperComponent {
  readonly $data = input.required<TronStepItem[]>({ alias: 'data' });
  readonly $currentStep = model<number>(0, { alias: 'currentStep' });

  setStep(index: number): void {
    this.$currentStep.set(index);
  }
}