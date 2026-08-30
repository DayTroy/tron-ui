import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TronControl } from '../core/tron-control';

let nextId = 0;

@Component({
  selector: 'tron-input',
  imports: [],
  templateUrl: './tron-input.component.html',
  styleUrl: './tron-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronInputComponent extends TronControl<string> {
  readonly $label = input<string>('', { alias: 'label' });
  readonly $placeholder = input<string>('', { alias: 'placeholder' });
  readonly $hint = input<string>('', { alias: 'hint' });
  readonly $readonly = input<boolean>(false, { alias: 'readonly' });
  readonly $type = input<'text' | 'password' | 'email' | 'number' | 'search' | 'tel'>('text', { alias: 'type' });

  protected readonly fieldId = `tron-input-${nextId++}`;

  readonly $isInvalid = computed(() => {
    if (this.$isDisabled()) return false;
    const control = this.ngControl;
    return !!(control?.invalid && (control.dirty || control.touched));
  });

  onInputChange(newValue: string): void {
    this.emitValue(newValue);
  }

  onBlur(): void {
    this.onTouched();
  }
}
