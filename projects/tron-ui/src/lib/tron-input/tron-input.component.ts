import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

let nextId = 0;
@Component({
  selector: 'tron-input',
  imports: [],
  templateUrl: './tron-input.component.html',
  styleUrl: './tron-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronInputComponent {
  readonly $formControlName = input.required<string>({ alias: 'formControlName' });
  readonly $label = input<string>('', { alias: 'label' });
  readonly $placeholder = input<string>('', { alias: 'placeholder' });
  readonly $hint = input<string>('', { alias: 'hint' });

  readonly $value = model<string>('', { alias: 'value' });
  protected readonly fieldId = `tron-input-${nextId++}`;
} 