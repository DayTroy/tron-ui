import { Component, inject } from '@angular/core';
import { TronDialogService, TronInputComponent } from '../../../tron-ui/src/public-api';
import { TronButtonComponent } from '../../../tron-ui/src/lib/tron-button/tron-button.component';

@Component({
  selector: 'app-identity-dialog',
  standalone: true,
  imports: [TronButtonComponent, TronInputComponent],
  template: `
    <p>Grid access for sector 7-G requires elevated clearance. Provide your identity disc credentials to proceed.</p>

    <tron-input label="Program ID" placeholder="Enter identifier...">
      <ng-container ngProjectAs="[tronPrefix]">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.0754 12.2412V11.0753C11.0754 9.78758 10.0315 8.74365 8.74372 8.74365H5.24622C3.95847 8.74365 2.91455 9.78758 2.91455 11.0753V12.2412" stroke="#4A9AB5" stroke-width="1.16583" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4.66357 4.0802C4.66357 5.36708 5.70836 6.41187 6.99524 6.41187C8.28212 6.41187 9.32691 5.36708 9.32691 4.0802C9.32691 2.79332 8.28212 1.74854 6.99524 1.74854C5.70836 1.74854 4.66357 2.79332 4.66357 4.0802V4.0802" stroke="#4A9AB5" stroke-width="1.16583" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </ng-container>
    </tron-input>

    <tron-input label="Access code" type="password" placeholder="••••••••">
      <ng-container ngProjectAs="[tronPrefix]">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6.2" width="8" height="5.8" stroke="#4A9AB5" stroke-width="1.16583"/>
          <path d="M4.75 6.2V4.6a2.25 2.25 0 0 1 4.5 0v1.6" stroke="#4A9AB5" stroke-width="1.16583" stroke-linecap="round"/>
        </svg>
      </ng-container>
    </tron-input>

    <div class="tron-dialog__actions">
      <tron-button variant="ghost" (click)="dialog.hide()">Cancel</tron-button>
      <tron-button (click)="dialog.hide()">
        <ng-container ngProjectAs="[tronPrefix]">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/>
            <path d="M5 8.2l2.1 2.1L11.2 6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </ng-container>
        Authenticate
      </tron-button>
    </div>
  `,
})
export class IdentityDialogComponent {
  readonly dialog = inject(TronDialogService);
}
