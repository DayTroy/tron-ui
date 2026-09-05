import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TronControl } from '../core/tron-control';

let nextId = 0;

@Component({
  selector: 'tron-radio-group',
  imports: [],
  templateUrl: './tron-radio-group.component.html',
  styleUrl: './tron-radio-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronRadioGroupComponent extends TronControl<unknown> {
  readonly $label = input<string>('', { alias: 'label' });
  readonly $hint = input<string>('', { alias: 'hint' });
  readonly $orientation = input<'vertical' | 'horizontal'>('vertical', { alias: 'orientation' });

  /** Shared by the native inputs, which is what gives the group arrow-key navigation. */
  readonly name = `tron-radio-group-${nextId++}`;

  protected readonly labelId = `${this.name}-label`;

  readonly $isInvalid = computed(() => {
    this.$value();
    if (this.$isDisabled()) return false;
    const control = this.ngControl;
    return !!(control?.invalid && (control.dirty || control.touched));
  });

  select(value: unknown): void {
    if (this.$isDisabled()) return;
    this.emitValue(value);
    this.onTouched();
  }
}
