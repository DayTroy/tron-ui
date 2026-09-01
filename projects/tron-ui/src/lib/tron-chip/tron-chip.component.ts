import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'tron-chip',
  imports: [],
  templateUrl: './tron-chip.component.html',
  styleUrl: './tron-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronChipComponent {
  readonly $variant = input<'primary' | 'success' | 'warning' | 'danger' | 'accent'>('primary', { alias: 'variant' });
  readonly $type = input<'dot' | 'pulse' | null>(null, { alias: 'type' });
  readonly $disabled = input<boolean>(false, { alias: 'disabled' });
}
