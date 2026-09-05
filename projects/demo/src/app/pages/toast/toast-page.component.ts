import { Component, inject } from '@angular/core';
import { TronButtonComponent, TronToastService } from '../../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-toast-page',
  standalone: true,
  imports: [TronButtonComponent],
  templateUrl: './toast-page.component.html',
})
export class ToastPageComponent {
  private readonly toasts = inject(TronToastService);

  notifyInfo(): void {
    this.toasts.info(
      'Network Sync Complete',
      'Grid connection established on port 2048. All sectors responding normally.'
    );
  }

  notifySuccess(): void {
    this.toasts.success(
      'User Program Recognized',
      'Identity verified. Welcome to the Grid. System resources allocated successfully.'
    );
  }

  notifyWarning(): void {
    this.toasts.warning(
      'Sector 12 Anomaly Detected',
      'Unusual data patterns observed in grid sector 12. MCP monitoring activated.'
    );
  }

  notifyDanger(): void {
    this.toasts.danger(
      'FATAL: Memory Corruption',
      'Critical system failure in partition 0x3E8. Emergency derezzification protocol engaged.'
    );
  }
}
