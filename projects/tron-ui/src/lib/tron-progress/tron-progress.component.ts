import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type TronProgressType = 'primary' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'tron-progress',
  imports: [],
  templateUrl: './tron-progress.component.html',
  styleUrl: './tron-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronProgressComponent {
  readonly $type = input<TronProgressType>('primary', { alias: 'type' });
  readonly $value = input<number>(0, { alias: 'value' });
  readonly $max = input<number>(100, { alias: 'max' });

  readonly $percent = computed(() => {
    const max = this.$max();
    if (max <= 0) return 0;
    return Math.min(100, Math.max(0, (this.$value() / max) * 100));
  });
}
