import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { TronButtonComponent, TronDialogService, TronInputComponent } from '../../../../../tron-ui/src/public-api';
import { IdentityDialogComponent } from '../../identity-dialog.component';

@Component({
  selector: 'app-dialog-page',
  standalone: true,
  imports: [TronButtonComponent, TronInputComponent],
  templateUrl: './dialog-page.component.html',
})
export class DialogPageComponent {
  readonly dialog = inject(TronDialogService);
  private readonly identityTpl = viewChild.required<TemplateRef<unknown>>('identity');

  openIdentity(): void {
    this.dialog.show(this.identityTpl(), {
      title: 'Identity verification',
      subtitle: 'System prompt · clearance required',
    });
  }

  openIdentityComponent(): void {
    this.dialog.show(IdentityDialogComponent, {
      title: 'Identity verification',
      subtitle: 'Component · clearance required',
    });
  }
}
