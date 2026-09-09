import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { TronControl } from '../core/tron-control';
import { TronIconComponent } from '../tron-icon/tron-icon.component';

@Component({
  selector: 'tron-checkbox',
  imports: [TronIconComponent],
  templateUrl: './tron-checkbox.component.html',
  styleUrl: './tron-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronCheckboxComponent extends TronControl<boolean> {
  readonly $checked = computed(() => this.$value() === true);

  onNativeChange(event: Event): void {
    if (this.$isDisabled()) return;

    this.emitValue((event.target as HTMLInputElement).checked);
    this.onTouched();
  }

  onBlur(): void {
    this.onTouched();
  }
}
