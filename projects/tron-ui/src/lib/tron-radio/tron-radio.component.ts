import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TronRadioGroupComponent } from './tron-radio-group.component';

@Component({
  selector: 'tron-radio',
  imports: [],
  templateUrl: './tron-radio.component.html',
  styleUrl: './tron-radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronRadioComponent {
  readonly $value = input.required<unknown>({ alias: 'value' });
  readonly $disabled = input<boolean>(false, { alias: 'disabled' });

  /** The group owns the value; a radio outside one has nothing to write to. */
  private readonly group = inject(TronRadioGroupComponent);

  protected readonly name = this.group.name;

  readonly $checked = computed(() => this.group.$value() === this.$value());
  readonly $isDisabled = computed(() => this.$disabled() || this.group.$isDisabled());

  onNativeChange(): void {
    this.group.select(this.$value());
  }

  onBlur(): void {
    this.group.onTouched();
  }
}
