import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TronControl } from '../core/tron-control';

let nextId = 0;

@Component({
  selector: 'tron-textarea',
  imports: [],
  templateUrl: './tron-textarea.component.html',
  styleUrl: './tron-textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronTextareaComponent extends TronControl<string> {
  readonly $label = input<string>('', { alias: 'label' });
  readonly $placeholder = input<string>('', { alias: 'placeholder' });
  readonly $hint = input<string>('', { alias: 'hint' });
  readonly $readonly = input<boolean>(false, { alias: 'readonly' });
  readonly $rows = input<number>(4, { alias: 'rows' });
  readonly $maxlength = input<number | null>(null, { alias: 'maxlength' });
  readonly $resize = input<'vertical' | 'none'>('vertical', { alias: 'resize' });

  protected readonly fieldId = `tron-textarea-${nextId++}`;

  readonly $isInvalid = computed(() => {
    this.$value();
    if (this.$isDisabled()) return false;
    const control = this.ngControl;
    return !!(control?.invalid && (control.dirty || control.touched));
  });

  readonly $hasFooter = computed(() => !!this.$hint() || this.$maxlength() !== null);

  readonly $counter = computed(() => {
    const max = this.$maxlength();
    if (max === null) return '';
    return `${(this.$value() ?? '').length} / ${max}`;
  });

  onInputChange(newValue: string): void {
    this.emitValue(newValue);
  }

  onBlur(): void {
    this.onTouched();
  }
}
