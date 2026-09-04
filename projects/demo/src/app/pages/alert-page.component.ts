import { Component, inject } from '@angular/core';
import { TronAlertService, TronButtonComponent } from '../../../../tron-ui/src/public-api';

@Component({
  selector: 'app-alert-page',
  standalone: true,
  imports: [TronButtonComponent],
  template: `
    <section class="catalog">
      <header class="catalog__head">
        <h1>Alert</h1>
        <p>Toast stack via TronAlertService. Outlet lives on the shell.</p>
      </header>

      <div class="catalog__block">
        <h2>Types</h2>
        <div class="catalog__row">
          <tron-button (click)="notifyInfo()">Info</tron-button>
          <tron-button (click)="notifySuccess()">Success</tron-button>
          <tron-button (click)="notifyWarning()">Warning</tron-button>
          <tron-button variant="danger" (click)="notifyDanger()">Danger</tron-button>
        </div>
      </div>
    </section>
  `,
})
export class AlertPageComponent {
  private readonly alerts = inject(TronAlertService);

  notifyInfo(): void {
    this.alerts.info(
      'Network Sync Complete',
      'Grid connection established on port 2048. All sectors responding normally.'
    );
  }

  notifySuccess(): void {
    this.alerts.success(
      'User Program Recognized',
      'Identity verified. Welcome to the Grid. System resources allocated successfully.'
    );
  }

  notifyWarning(): void {
    this.alerts.warning(
      'Sector 12 Anomaly Detected',
      'Unusual data patterns observed in grid sector 12. MCP monitoring activated.'
    );
  }

  notifyDanger(): void {
    this.alerts.danger(
      'FATAL: Memory Corruption',
      'Critical system failure in partition 0x3E8. Emergency derezzification protocol engaged.'
    );
  }
}
