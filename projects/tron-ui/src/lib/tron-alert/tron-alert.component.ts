import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

const LABELS = {
  info: 'INFO',
  success: 'SUCCESS',
  warning: 'WARNING',
  danger: 'ERROR',
}

@Component({
  selector: 'tron-alert',
  imports: [],
  templateUrl: './tron-alert.component.html',
  styleUrl: './tron-alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TronAlertComponent {
  readonly $type = input<'info' | 'success' | 'warning' | 'danger'>('info', { alias: 'type' });
  readonly $title = input.required<string>({ alias: 'title' });
  readonly $message = input<string>('', { alias: 'message' });
  readonly $dismissed = output();
  
  readonly $label = computed(() => LABELS[this.$type()]);

  dismiss(): void {
    this.$dismissed.emit();
  }
}
