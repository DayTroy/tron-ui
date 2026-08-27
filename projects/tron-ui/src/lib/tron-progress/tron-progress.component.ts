import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';

@Component({
  selector: 'tron-progress',
  imports: [],
  templateUrl: './tron-progress.component.html',
  styleUrl: './tron-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronProgressComponent {
  readonly $label = input<string>('', { alias: 'label' });
  readonly $type = input<'primary' |  'success' | 'warning' | 'error'>('primary', { alias: 'type' });
  readonly $value = input<number>(0, { alias: 'value' });
  readonly $max = input<number>(100);

  readonly $percent = computed(() => 
    Math.min(100, Math.max(0, Math.floor(this.$value() / this.$max() * 100)))
  );
  
  readonly $status = computed<'danger' | 'warning' | 'success'>(() => {
    const percent = this.$percent();
    if (percent < 30) return 'danger';
    if (percent < 70) return 'warning';
    return 'success';
  });
}