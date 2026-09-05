import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

const LABELS = {
  info: 'INFO',
  success: 'SUCCESS',
  warning: 'WARNING',
  danger: 'ERROR',
};

@Component({
  selector: 'tron-toast',
  imports: [],
  templateUrl: './tron-toast.component.html',
  styleUrl: './tron-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronToastComponent {
  readonly $type = input<'info' | 'success' | 'warning' | 'danger'>('info', { alias: 'type' });
  readonly $title = input.required<string>({ alias: 'title' });
  readonly $message = input<string>('', { alias: 'message' });
  readonly $dismissed = output({ alias: 'dismissed' });

  readonly $label = computed(() => LABELS[this.$type()]);

  dismiss(): void {
    this.$dismissed.emit();
  }
}
