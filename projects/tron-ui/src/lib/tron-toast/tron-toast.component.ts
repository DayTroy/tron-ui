import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { TronIconComponent, type TronIconName } from '../tron-icon/tron-icon.component';

const LABELS = {
  info: 'INFO',
  success: 'SUCCESS',
  warning: 'WARNING',
  danger: 'ERROR',
};

const ICONS: Record<keyof typeof LABELS, TronIconName> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
};

@Component({
  selector: 'tron-toast',
  imports: [TronIconComponent],
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
  readonly $iconName = computed(() => ICONS[this.$type()]);

  dismiss(): void {
    this.$dismissed.emit();
  }
}
