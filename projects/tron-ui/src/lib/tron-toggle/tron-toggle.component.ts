import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TronControl } from '../core/tron-control';

@Component({
  selector: 'tron-toggle',
  imports: [],
  templateUrl: './tron-toggle.component.html',
  styleUrl: './tron-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronToggleComponent extends TronControl<boolean> {
  readonly $label = input<string>('', { alias: 'label' });

  toggle(): void {
    if (this.$isDisabled()) return;

    this.emitValue(!this.$value());
    this.onTouched();
  }
}
