import { Component, inject } from '@angular/core';
import { TronButtonComponent, TronDialogService, TronIconComponent, TronInputComponent } from '../../../tron-ui/src/public-api';

@Component({
  selector: 'app-identity-dialog',
  standalone: true,
  imports: [TronButtonComponent, TronIconComponent, TronInputComponent],
  styles: `
    :host {
      display: contents;
    }
  `,
  template: `
    <p>Grid access for sector 7-G requires elevated clearance. Provide your identity disc credentials to proceed.</p>

    <tron-input label="Program ID" placeholder="Enter identifier...">
      <tron-icon tronPrefix name="user" />
    </tron-input>

    <tron-input label="Access code" type="password" placeholder="••••••••">
      <tron-icon tronPrefix name="lock" />
    </tron-input>

    <div class="tron-dialog__actions">
      <tron-button variant="ghost" (click)="dialog.hide()">Cancel</tron-button>
      <tron-button (click)="dialog.hide()">
        <tron-icon tronPrefix name="success" />
        Authenticate
      </tron-button>
    </div>
  `,
})
export class IdentityDialogComponent {
  readonly dialog = inject(TronDialogService);
}
